import { NextResponse } from 'next/server';

import { initialize as ProductModuleInitialize } from "@medusajs/product"

export async function GET(request: Request) {
  const productModule = await ProductModuleInitialize({
    database: {
      clientUrl: process.env.POSTGRES_URL!,
      schema: "public",
    }
  })

  const data = await productModule.list()

  return NextResponse.json({ products: data });
}
