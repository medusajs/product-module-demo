// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { initialize as ProductModuleInitialize } from "@medusajs/product"
import { NextResponse } from 'next/server';

declare global {
  var productModule: any
}

export async function GET(request: Request) {
  const localisation = (request.headers.get("X-localisation") || "Denmark").toLowerCase()
  const recentCategoryIds = request.headers.get("X-recent-categories")
    ? request.headers.get("X-recent-categories")!.split(",").map((category) => category.toLowerCase())
    : null

  global.productModule = global.productModule ?? await ProductModuleInitialize({
    database: {
      clientUrl: process.env.POSTGRES_URL!,
      schema: "public",
      driverOptions: {
        connection: {
          ssl: false
        },
      }
    }
  })

  const products = await queryProducts({ localisation, recentCategoryIds })
  return NextResponse.json({ products });
}

async function queryProducts({ localisation, recentCategoryIds }: { localisation: string, recentCategoryIds: string[] | null }): Promise<any[]> {
  const limit = 12
  const queryOptions = {
    take: limit,
    relations: ["tags", "categories"]
  }

  // Fetch product for the categories and outside the categories paginated by 12
  const promises: Promise<any>[] = []

  const commonFilter: any = {
    tags: { value: [localisation] },
  }

  const filterInCategories = { ...commonFilter }
  const filterNotInCategories = { ...commonFilter }

  if (recentCategoryIds?.length) {
    filterInCategories["categories"] = { id: recentCategoryIds }
    filterNotInCategories["categories"] = { id: { $nin: recentCategoryIds }}
  }

  // Todo: This wont work because of the pagination, the client should have two requests
  // One for the recent categories and one for the other categories and then the client will manage the pagination
  promises.push(productModule.list(filterInCategories, queryOptions))
  promises.push(productModule.list(filterNotInCategories, queryOptions))

  const [recentProducts, otherProducts] = await Promise.all(promises)
  const products = recentProducts

  if (products.length < limit) {
    products.push(...otherProducts.slice(0, limit - products.length))
  }

  return products
}