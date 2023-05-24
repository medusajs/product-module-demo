// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product } from "@medusajs/medusa/dist/models/product";
import { kv } from "@vercel/kv";
import { initialize as ProductModuleInitialize } from "@medusajs/product";
import { FindConfig, ProductTypes } from "@medusajs/types";
import { NextRequest, NextResponse } from "next/server";
import { UserData } from "../category-tracker/route";

declare global {
  var productService: ProductTypes.IProductService;
}

export async function GET(req: NextRequest) {
  global.productService =
    global.productService ??
    (await ProductModuleInitialize({
      database: {
        clientUrl: process.env.POSTGRES_URL!,
        schema: "public",
        driverOptions: {
          connection: {
            ssl: false,
          },
        },
      },
    }));

  // const { filters, options } = parsedQueryFiltersAndOptions(req);

  const userId = req.headers.get("x-user-id");
  // const userId = req.cookies.get("userId")?.value;
  console.log(userId);

  if (!userId) {
    return;
  }

  const userData: UserData = (await kv.get(userId)) || ({} as UserData);
  const { categoryId, categoryName } = userData;

  const localisation = (
    req.nextUrl.searchParams.get("localisation") ??
    req.headers.get("x-vercel-ip-country-region") ??
    "Denmark"
  ).toLowerCase();

  const personalizedProducts: Product[] = await global.productService.list({
    tags: { value: [localisation.toLowerCase()] },
  });

  const allProducts: Product[] = await global.productService.list(
    {},
    { relations: ["categories"] }
  );

  if (categoryId) {
    sortProductsByCategory(allProducts, categoryId);
  }

  return NextResponse.json({
    personalized_section: {
      country: "Denmark",
      continent: "Europe",
      products: personalizedProducts,
    },
    all_products_section: {
      category_name: categoryName,
      products: allProducts,
    },
  });
}

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
