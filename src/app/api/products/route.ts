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

  const localisation = (req.headers.get("x-vercel-ip-country-region") ?? req.nextUrl.searchParams.get("localisation") ?? "Denmark").toLowerCase()
  filters.tags = { value: [localisation.toLowerCase()] }

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
  const limit = req.nextUrl.searchParams.get("limit") || 12
  const offset = req.nextUrl.searchParams.get("offset") || 0

  const filters: any = {}

  const filterKeys = new Set(
    [...(req.nextUrl.searchParams.keys() as unknown as string[])]
      .filter(v => v !== "limit" && v !== "offset")
  )

  for (const key of Array.from(filterKeys)) {
    const values = req.nextUrl.searchParams.getAll(key)

    const prop = key.split("[")[0]
    const operator = key.split("[")[1]?.split("]")[0]
    filters[prop] = operator
      ? { [`$${operator}`]: values }
      : (values.length === 1 ? values[0] : values)
  }
  
  return {
    filters,
    options: {
      take: Number(limit),
      skip: Number(offset),
    }
  }
}