import { Details, Divider, Feature, Gallery, Grid } from "@/components";
import { client } from "@/lib";

type Props = {
  params: {
    handle: string;
  };
};

async function getProductCategory(handle: string) {
  const res = await client.productCategories.list({
    handle: handle,
  });

  const category = res.product_categories?.[0];

  if (!category) {
    throw new Error(`Product with handle ${handle} not found`);
  }

  return category;
}

async function getProductsByCategory(categoryIds: string[]) {
  const res = await client.products.list({
    category_id: categoryIds,
    include_category_children: true,
  });

  const products = res.products

  return products;
}

export default async function ProductCategory({ params: { handle } }: Props) {
  const productCategory = await getProductCategory(handle);
  const products = await getProductsByCategory([productCategory.id])
  const product = products[0]

  return (
    <>
      <div className="flex items-start justify-center mb-10">
        <div className="max-w-7xl w-full">
          <h3 className="font-medium text-headers-h3">{productCategory.name}</h3>
        </div>
      </div>

      <div className="flex items-start justify-center">
        <div className="max-w-7xl w-full">
          <Grid products={products} max={12} />
        </div>
      </div>
    </>
  );
}
