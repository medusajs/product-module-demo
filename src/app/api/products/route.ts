// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { initialize as ProductModuleInitialize } from "@medusajs/product"
import { NextResponse } from 'next/server';

declare global {
  var productModule: any
}

export async function GET(request: Request) {
  const localisation = (request.headers.get("X-localisation") || "Denmark").toLowerCase()
  const recentCategoryIds = (request.headers.get("X-recent-categories") || "").split(",").map((category) => category.toLowerCase())

  global.productModule = global.productModule ?? await ProductModuleInitialize({
    database: {
      clientUrl: process.env.POSTGRES_URL!,
      schema: "public",
      driverOptions: {
        connection: {
          ssl: {
            rejectUnauthorized: false
          }
        },
      }
    }
  })

  const products = await queryProducts({ localisation, recentCategoryIds })
  return NextResponse.json({ products });
}

async function queryProducts({ localisation, recentCategoryIds }: { localisation: string, recentCategoryIds: string[] }): Promise<any[]> {
  const limit = 12

  // Fetch product for the categories and outside the categories paginated by 12
  const promises: Promise<any>[] = []

  promises.push(productModule.list({
    tags: { value: [localisation] },
    categories: { id: recentCategoryIds }
  }, {
    relations: ["tags", "categories"],
    take: limit
  }))

  promises.push(await productModule.list({
    tags: { value: [localisation] },
    categories: { id: { $nin: { recentCategoryIds }}}
  }, {
    relations: ["tags", "categories"],
    take: limit
  }))

  const [recentProducts, otherProducts] = await Promise.all(promises)
  const products = recentProducts

  if (products.length < limit) {
    products.push(...otherProducts.slice(0, limit - products.length))
  }

  return products
}