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

type Data = {
  handle?: string;
  categoryId?: string;
  categoryName?: string;
  continent: string;
  continentText: { article: string; name: string };
  country: string;
}

export async function GET(req: NextRequest) {
  const productService = (global.productService ??=
    await ProductModuleInitialize());

  const {
    handle,
    categoryId,
    categoryName,
    continent,
    continentText,
    country
  } = await getData(req);

  let [personalizedProducts, allProducts] = await queryProducts({
    handle,
    continent
  });

  await getAndAssignPricesToProducts({ products: allProducts })

  const data = orderProductByCategoryIdFirst({
    products: allProducts,
    personalizedProducts,
    recentlyVisitedCategoryId: categoryId,
  })

  return NextResponse.json({
    personalized_section: {
      country,
      continent_text: continentText,
      products: data.personalizedProducts,
    },
    all_products_section: {
      category_name: categoryName,
      products: data.products,
    },
  });
}

async function getData(req: NextRequest): Promise<Data> {
  const handle = req.nextUrl.searchParams.get("handle") ?? undefined;

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

  return {
    handle,
    country,
    categoryId,
    categoryName,
    continent,
    continentText,
  }
}

async function queryProducts({
 handle,
 continent
}: {
  handle?: string;
  continent: string
}): Promise<[ProductTypes.ProductDTO[], ProductTypes.ProductDTO[]]> {
  const productService = global.productService
  const filters: { handle?: string } = {};

  if (handle) {
    filters.handle = handle;
  }

  return await Promise.all([
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
}

async function getAndAssignPricesToProducts({ products }: { products: ProductTypes.ProductDTO[] }): Promise<void> {
  const region = await client.regions.list().then((res) => res.regions[0]);

  const pricedProducts = (
    await client.products.list({
      id: products.map((p) => p.id),
      expand: "variants,variants.prices,tags",
      region_id: region.id ?? undefined,
    })
  ).products as unknown as PricedProduct[];

  const variants = pricedProducts.map((p: PricedProduct) => p.variants).flat();

  const variantsMap = new Map<string, PricedVariant>();

  for (const variant of variants) {
    variantsMap.set(variant.id!, variant);
  }

  for (const product of products) {
    (product as any).variants = (product as any).variants.map(
      (variant: any) => {
        return {
          ...variantsMap.get(variant.id),
          ...variant,
        };
      }
    );
  }
}

function orderProductByCategoryIdFirst({
  products,
  personalizedProducts,
  recentlyVisitedCategoryId
}: {
  products: ProductTypes.ProductDTO[];
  personalizedProducts: ProductTypes.ProductDTO[];
  recentlyVisitedCategoryId?: string;
}) {
  const productMap = new Map<string, ProductTypes.ProductDTO>();
  const categoryProductsMap = new Map<string, ProductTypes.ProductDTO[]>();

  for (const product of products) {
    const category = product.categories[0];
    if (!categoryProductsMap.has(category?.id)) {
      categoryProductsMap.set(category?.id, []);
    }

    categoryProductsMap.get(category?.id)!.push(product);
    productMap.set(product.id, product);
  }

  let recentlyViewedProducts: ProductTypes.ProductDTO[] = [];
  if (recentlyVisitedCategoryId) {
    recentlyViewedProducts = categoryProductsMap.get(recentlyVisitedCategoryId)!;
    categoryProductsMap.delete(recentlyVisitedCategoryId);
  }

  const allProducts = Array.from(recentlyViewedProducts.values()).concat(
    Array.from(categoryProductsMap.values()).flat()
  );

  // Assign the products data to the light personalized products
  personalizedProducts = personalizedProducts.map(
    (p: ProductTypes.ProductDTO) => {
      return productMap.get(p.id)!;
    }
  );

  return { personalizedProducts, products }
}