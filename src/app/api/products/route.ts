// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { kv } from "@vercel/kv";
import { initialize as ProductModuleInitialize } from "@medusajs/product";
import { ProductTypes } from "@medusajs/types";
import { NextRequest, NextResponse } from "next/server";
import { formatContinent, isoAlpha2Countries } from "@/lib/utils";
import { UserData } from "@/types";
import { client } from "@/lib";
import {
  PricedProduct,
  PricedVariant,
} from "@medusajs/medusa/dist/types/pricing";

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
  const productService = (global.productService ??=
    await ProductModuleInitialize(productModuleConfig));

  const handle = req.nextUrl.searchParams.get("handle");

  const userId = req.cookies.get("userId")?.value;
  let categoryId, categoryName;

  if (userId) {
    const userData = ((await kv.get(userId)) ?? {}) as UserData;

    categoryId = userData.categoryId;
    categoryName = userData.categoryName;
  }

  const countryCode: string =
    req.headers.get("x-simulated-country") ??
    req.headers.get("x-vercel-ip-country") ??
    "NL";

  let { name: country, continent } = isoAlpha2Countries[countryCode];
  const continentText = formatContinent(continent);

  const filters: { handle?: string } = {};

  if (handle) {
    filters.handle = handle;
  }

  let [personalizedProducts, allProducts] = await Promise.all([
    productService.list(
      {
        ...filters,
        tags: { value: [continent] },
      },
      {
        select: ["id"],
        take: 3,
      }
    ),
    productService.list(filters, {
      relations: ["variants", "categories", "tags"],
      order: { id: "DESC" },
    }),
  ]);

  const region = await client.regions.list().then((res) => res.regions[0]);

  const pricedProducts = (
    await client.products.list({
      id: allProducts.map((p: ProductTypes.ProductDTO) => p.id),
      expand: "variants,variants.prices,tags",
      region_id: region.id ?? undefined,
    })
  ).products as unknown as PricedProduct[];

  const variants = pricedProducts.map((p: PricedProduct) => p.variants).flat();

  const variantsMap = new Map<string, PricedVariant>();

  for (const variant of variants) {
    variantsMap.set(variant.id!, variant);
  }

  const productMap = new Map<string, ProductTypes.ProductDTO>();
  const categoryProductsMap = new Map<string, ProductTypes.ProductDTO[]>();

  for (const product of allProducts) {
    (product as any).variants = (product as any).variants.map(
      (variant: any) => {
        return {
          ...variantsMap.get(variant.id),
          ...variant,
        };
      }
    );

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
