// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { initialize as ProductModuleInitialize } from "@medusajs/product"
import {FindConfig, ProductTypes } from "@medusajs/types"
import {NextRequest, NextResponse } from 'next/server';

declare global {
  var productService: ProductTypes.IProductService
}

export async function GET(req: NextRequest) {
  global.productService = global.productService ?? await ProductModuleInitialize({
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

  const { filters, options } = parsedQueryFiltersAndOptions(req)

  const [products = [], count] = await global.productService.listAndCount(filters, {
    ...options,
    relations: ["tags", "categories"]
  })

  return NextResponse.json({
    products,
    count,
    limit: options.take,
    offset: options.skip
  });
}

function parsedQueryFiltersAndOptions(req: NextRequest): { filters: ProductTypes.FilterableProductProps, options: FindConfig<ProductTypes.ProductDTO> } {
  const localisation = (req.headers.get("X-localisation") || "Denmark").toLowerCase()
  const limit = req.nextUrl.searchParams.get("limit") || 12
  const offset = req.nextUrl.searchParams.get("offset") || 0
  const categoriesKey = [...(req.nextUrl.searchParams.keys() as unknown as string[])]
    .find(k => k.startsWith("categories"))

  const filters: any = {
    tags: { value: [localisation.toLowerCase()] }
  }

  if (categoriesKey) {
    const categories = req.nextUrl.searchParams.get(categoriesKey)!.split(",")
    const categoriesOperator = `$${categoriesKey.split("[")[1].split("]")[0]}`
    filters.categories = { id: { [categoriesOperator]: categories }}
  }

  return {
    filters,
    options: {
      take: Number(limit),
      skip: Number(offset),
    }
  }
}