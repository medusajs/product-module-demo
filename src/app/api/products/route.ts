// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { kv } from "@vercel/kv";
import { initialize as ProductModuleInitialize } from "@medusajs/product";
import { ProductTypes } from "@medusajs/types";
import { NextRequest, NextResponse } from "next/server";
import { formatContinent, isoAlpha2Countries } from "@/lib/utils";
import { UserData } from "@/types";
import { createProducts } from "@medusajs/workflows";

type Data = {
  categoryId?: string;
  categoryName?: string;
};

export async function GET(req: NextRequest) {
  const start = performance.now();

  // If already instantiated, it will return the instance or create a new one
  await ProductModuleInitialize();

  const countryCode: string = req.headers.get("x-country") ?? "US";

  const { name: country, continent } = isoAlpha2Countries[countryCode];
  const continentText = formatContinent(continent);

  const now = performance.now();

  const [{ categoryId, categoryName }, [personalizedProducts, allProducts]] =
    await queryProducts(req, continent);

  const end = performance.now();
  console.log(`[API] queryProducts + getKvData took ${end - now}ms`);

  const data = orderProductByCategoryIdFirst({
    products: allProducts,
    personalizedProducts,
    recentlyVisitedCategoryId: categoryId,
  });

  try {
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
    });
  } finally {
    const end = performance.now();
    console.log(`[API] GET took ${end - start}ms`);
  }
}

export async function POST(req: NextRequest) {
  const { title } = (await req.json()) as { title: string }

  const generatedProductData = generateProductData()
  const data = [{ ...generatedProductData, title } as ProductTypes.CreateProductDTO]

  await ProductModuleInitialize()
  const createProductsWorkflow = createProducts()

  try {
    const { result: products } = await createProductsWorkflow.run({
      input: data,
    })

    return new Response(JSON.stringify({ products }));
  } catch (e) {
    return new Response(JSON.stringify({ errors: e }));
  }
}

async function queryProducts(
  req: NextRequest,
  continent: string
): Promise<[Data, [ProductTypes.ProductDTO[], ProductTypes.ProductDTO[]]]> {
  const productService = await ProductModuleInitialize();

  const userId = req.headers.get("x-userId");
  let categoryId, categoryName;

  const start = performance.now();

  const [userData, ...productsData] = await Promise.all([
    userId ? kv.get<UserData>(userId) : Promise.resolve({} as UserData),
    productService
      .list(
        {
          tags: { value: [continent] },
        },
        {
          select: ["id"],
          take: 3,
        }
      )
      .finally((data: ProductTypes.ProductDTO[]) => {
        const end = performance.now();
        console.log(`[API] productService.list take 3 took ${end - start}ms`);
        return data;
      }),
    productService
      .list(
        {},
        {
          relations: ["variants", "categories", "tags"],
          order: { id: "DESC" },
          take: 100,
        }
      )
      .finally((data: ProductTypes.ProductDTO[]) => {
        const end = performance.now();
        console.log(`[API] productService.list take 100 took ${end - start}ms`);
        return data;
      }),
  ]);

  categoryId = userData?.categoryId;
  categoryName = userData?.categoryName;

  return [
    {
      categoryId,
      categoryName,
    },
    productsData,
  ];
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
    recentlyViewedProducts =
      categoryProductsMap.get(recentlyVisitedCategoryId) ?? [];
    categoryProductsMap.delete(recentlyVisitedCategoryId);
  }

  const allProducts = recentlyViewedProducts.concat(
    Array.from(categoryProductsMap.values()).flat()
  );

  // Assign the products data to the personalized products
  personalizedProducts = personalizedProducts.map(
    (p: ProductTypes.ProductDTO) => {
      return productMap.get(p.id)!;
    }
  );

  return { personalizedProducts, allProducts };
}

/**
 *
 * WORKFLOW RELATED UTILS BELOW
 *
 */

function generateRandomInteger(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1))
}


function generateRandomStringInteger() {
  const max = 10000000
  const min = 0
  return generateRandomInteger(min, max).toString()
}

function generateProductData(title = '', options: any[] = [], variants: any[] = []) {
  title = title || generateRandomStringInteger()

  const optionTitle = generateRandomStringInteger()
  options = options.length ? options : [{
    title: optionTitle
  }]

  if (!variants.length) {
    for (let i = 0; i < 25; ++i) {
      const pricesData = [{
        currency_code: 'usd',
        amount: generateRandomInteger(1, 10000)
      }]

      const data = {
        title: generateRandomStringInteger(),
        options: [{ value: optionTitle }]
      }
      variants.push(data)
    }
  }

  const data = {
    title,
    options,
    variants,
  }

  return data
}