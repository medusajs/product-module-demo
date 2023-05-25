// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { kv } from "@vercel/kv";
import { initialize as ProductModuleInitialize } from "@medusajs/product";
import { FindConfig, ProductTypes } from "@medusajs/types";
import { NextRequest, NextResponse } from "next/server";
import { formatContinent, isoAlpha2Countries } from "@/lib/utils";
import { UserData } from "@/types";
import { client } from "@/lib";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

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
};

export async function GET(req: NextRequest) {
  global.productService =
    global.productService ??
    (await ProductModuleInitialize(productModuleConfig));

  // const userId = req.headers.get("x-user-id");
  const userId = req.cookies.get("userId")?.value;

  if (!userId) {
    return NextResponse.json(
      {},
      {
        status: 400,
        statusText:
          "Unable to query the products, the user id header 'x-user-id' is missing",
      }
    );
  }

  const { categoryId, categoryName } = ((await kv.get(userId)) ??
    {}) as UserData;

  const countryCode: string =
    req.headers.get("x-simulated-country") ??
    req.headers.get("x-vercel-ip-country") ??
    "NL";

  let { name: country, continent } = isoAlpha2Countries[countryCode];
  const continentText = formatContinent(continent);

  let [personalizedProducts, allProducts] = await Promise.all([
    global.productService.list(
      {
        tags: { value: [continent] },
      },
      {
        select: ["id"],
        take: 3,
      }
    ),
    global.productService.list(
      {},
      {
        relations: ["variants", "categories"],
        order: { id: "DESC" },
      }
    ),
  ]);

  const pricedProducts = await client.products.list({
    id: allProducts.map((p: ProductTypes.ProductDTO) => p.id),
    expand: "variants,variants.prices",
  });

  const pricedProductsVariantsMap = new Map<string, any>(
    pricedProducts.products
      .map((p: ProductTypes.ProductDTO) =>
        p.variants.map((v: PricedProduct["variants"][0]) => [v.id, v])
      )
      .flat()
  );

  const productMap = new Map<string, ProductTypes.ProductDTO>();
  const categoryProductsMap = new Map<string, ProductTypes.ProductDTO[]>();

  for (const product of allProducts) {
    product.variants = product.variants.map((v: any) => {
      v.prices = pricedProductsVariantsMap.get(v.id)!.prices;
    });

    const category = product.categories[0];
    if (!categoryProductsMap.has(category.id)) {
      categoryProductsMap.set(category.id, []);
    }

    categoryProductsMap.get(category.id)!.push(product);
    productMap.set(product.id, product);
  }

  let recentlyViewedProducts: ProductTypes.ProductDTO[] = [];
  if (categoryId) {
    recentlyViewedProducts = categoryProductsMap.get(categoryId)!;
    categoryProductsMap.delete(categoryId);
  }

  allProducts = Array.from(recentlyViewedProducts.values()).concat(
    Array.from(categoryProductsMap.values()).flat()
  );

  personalizedProducts = personalizedProducts.map(
    (p: ProductTypes.ProductDTO) => {
      return productMap.get(p.id)!;
    }
  );

  return NextResponse.json({
    personalized_section: {
      country,
      continent_text: continentText,
      products: personalizedProducts,
    },
    all_products_section: {
      category_name: categoryName,
      products: allProducts,
    },
  });
}
