// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { kv } from "@vercel/kv";
import { initialize as ProductModuleInitialize } from "@medusajs/product";
import { ProductTypes } from "@medusajs/types";
import { NextRequest, NextResponse } from "next/server";
import { formatContinent, isoAlpha2Countries } from "@/lib/utils";
import { UserData } from "@/types";

declare global {
  var productService: ProductTypes.IProductService;
}

type Data = {
  categoryId?: string;
  categoryName?: string;
};

export async function GET(req: NextRequest) {
  // If already instaciated, it will return the instance or create a new one
  const productService = await ProductModuleInitialize();

  const countryCode: string =
    req.headers.get("x-simulated-country") ??
    req.headers.get("x-vercel-ip-country") ??
    "US";

  const { name: country, continent } = isoAlpha2Countries[countryCode];
  const continentText = formatContinent(continent);

  const now = performance.now()

  let [
    [personalizedProducts, allProducts],
    { categoryId, categoryName }
  ] = await Promise.all([
    await queryProducts({
      continent,
    }),
    await getKvData(req)
  ])

  const end = performance.now()
  console.log(`[API] queryProducts + getKvData took ${end - now}ms`)

  const data = orderProductByCategoryIdFirst({
    products: allProducts,
    personalizedProducts,
    recentlyVisitedCategoryId: categoryId,
  });

  return NextResponse.json({
    personalized_section: {
      country,
      continent_text: continentText,
      products: data.personalizedProducts,
    },
    all_products_section: {
      category_name: categoryName,
      products: data.allProducts,
    },
  })
}

async function getKvData(req: NextRequest): Promise<Data> {
  const now = performance.now()

  try {
    const userId = req.cookies.get("userId")?.value;
    let categoryId, categoryName;

    if (userId) {
      const userData = ((await kv.get(userId)) ?? {}) as UserData;

      categoryId = userData.categoryId;
      categoryName = userData.categoryName;
    }

    return {
      categoryId,
      categoryName,
    };
  } finally {
    const end = performance.now()
    console.log(`[API] getKvData took ${end - now}ms`)
  }
}

async function queryProducts({
  continent,
}: {
  continent: string;
}): Promise<[ProductTypes.ProductDTO[], ProductTypes.ProductDTO[]]> {
  const productService = await ProductModuleInitialize();

  const now = performance.now()
  try {
    return await Promise.all([
      productService.list(
        {
          tags: { value: [continent] },
        },
        {
          select: ["id"],
          take: 3,
        }
      ),
      productService.list(
        {},
        {
          relations: ["variants", "categories", "tags"],
          order: { id: "DESC" },
          take: 100,
        }
      ),
    ]);
  } finally {
    const end = performance.now()
    console.log(`[API] queryProducts took ${end - now}ms`)
  }
}

function orderProductByCategoryIdFirst({
  products,
  personalizedProducts,
  recentlyVisitedCategoryId,
}: {
  products: ProductTypes.ProductDTO[];
  personalizedProducts: ProductTypes.ProductDTO[];
  recentlyVisitedCategoryId?: string;
}) {
  const productMap = new Map<string, ProductTypes.ProductDTO>();
  const categoryProductsMap = new Map<string, ProductTypes.ProductDTO[]>();

  for (const product of products) {
    const category = product.categories?.[0];
    if (!categoryProductsMap.has(category?.id!)) {
      categoryProductsMap.set(category?.id!, []);
    }

    categoryProductsMap.get(category?.id!)!.push(product);
    productMap.set(product.id, product);
  }

  let recentlyViewedProducts: ProductTypes.ProductDTO[] = [];
  if (recentlyVisitedCategoryId) {
    recentlyViewedProducts = categoryProductsMap.get(
      recentlyVisitedCategoryId
    )!;
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

  return { personalizedProducts, allProducts };
}
