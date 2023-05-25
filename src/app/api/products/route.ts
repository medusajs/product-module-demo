// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { kv } from "@vercel/kv";
import { initialize as ProductModuleInitialize } from "@medusajs/product";
import { FindConfig, ProductTypes } from "@medusajs/types";
import { NextRequest, NextResponse } from "next/server";
import { formatContinent, isoAlpha2Countries } from "@/lib/utils";
import { UserData } from "@/types";

declare global {
  var productService: ProductTypes.IProductService;
}

const productModuleConfig = {
  database: {
    clientUrl: process.env.POSTGRES_URL!,
    schema: "public",
    driverOptions: {
      connection: {
        ssl: false,
      },
    },
  },
}

export async function GET(req: NextRequest) {
  global.productService =
    global.productService ??
    await ProductModuleInitialize(productModuleConfig);

  const userId = req.headers.get("x-user-id");

  if (!userId) {
    return NextResponse.json({}, {
      status: 400,
      statusText: "Unable to query the products, the user id header 'x-user-id' is missing"
    });
  }

  const { categoryId, categoryName } = (await kv.get(userId) ?? {}) as UserData;

  const countryCode: string =
    req.headers.get("x-simulated-country") ??
    req.headers.get("x-vercel-ip-country") ??
    "NL";

  let { name: country, continent } = isoAlpha2Countries[countryCode];
  const continentText = formatContinent(continent);

  let [personalizedProducts, allProducts] = await Promise.all([
    global.productService.list({
      tags: { value: [continent] },
      category_ids: [categoryId]
    }, {
      select: ["id"]
    }),
    global.productService.list({}, {
      relations: ["variants", "categories"],
      order: { id: "DESC" }
    })
  ]);

  const productMap = new Map<string, ProductTypes.ProductDTO>(
    allProducts.map((p: ProductTypes.ProductDTO) => {
      return [p.id, p]
    })
  );

  personalizedProducts = personalizedProducts.map((p: ProductTypes.ProductDTO) => {
    const product = productMap.get(p.id)!;
    productMap.delete(p.id);
    return product;
  });

  return NextResponse.json({
    personalized_products: {
      country,
      continent_text: continentText,
      products: personalizedProducts,
    },
    products: {
      category_name: categoryName,
      products: Array.from(productMap.values()),
    },
  });
}

/*
const sortProductsByCategory = (
  products: Product[],
  categoryId: string
): Product[] => {
  products.sort((a, b) => {
    const hasCategoryA = a.categories.some(
      (category) => category.id === categoryId
    );
    const hasCategoryB = b.categories.some(
      (category) => category.id === categoryId
    );

    if (hasCategoryA && !hasCategoryB) {
      return -1;
    }
    if (!hasCategoryA && hasCategoryB) {
      return 1;
    }
    return 0;
  });

  return products;
};
*/

// function parsedQueryFiltersAndOptions(req: NextRequest): {
//   filters: ProductTypes.FilterableProductProps;
//   options: FindConfig<ProductTypes.ProductDTO>;
// } {
//   const limit = req.nextUrl.searchParams.get("limit") || 12;
//   const offset = req.nextUrl.searchParams.get("offset") || 0;

//   const filters: any = {};

//   const filterKeys = new Set(
//     [...(req.nextUrl.searchParams.keys() as unknown as string[])].filter(
//       (v) => v !== "limit" && v !== "offset"
//     )
//   );

//   for (const key of Array.from(filterKeys)) {
//     const values = req.nextUrl.searchParams.getAll(key);

//     const prop = key.split("[")[0];
//     const operator = key.split("[")[1]?.split("]")[0];
//     filters[prop] = operator
//       ? { [`$${operator}`]: values }
//       : values.length === 1
//       ? values[0]
//       : values;
//   }

//   return {
//     filters,
//     options: {
//       take: Number(limit),
//       skip: Number(offset),
//     },
//   };
// }
