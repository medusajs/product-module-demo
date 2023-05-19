// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { initialize as ProductModuleInitialize } from "@medusajs/product";
import { NextResponse } from "next/server";

declare global {
  var productModule: any;
}

export async function GET() {
  global.productModule =
    global.productModule ??
    (await ProductModuleInitialize({
      database: {
        clientUrl: process.env.POSTGRES_URL!,
        schema: "public",
        driverOptions: {
          connection: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
        },
      },
    }));

  console.log(productModule);

  const data = await productModule.list(
    {
      tags: { value: ["France"] },
    },
    {
      relations: ["tags"],
    }
  );
  return NextResponse.json({ data });
}
