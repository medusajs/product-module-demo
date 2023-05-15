import { Details, Divider, Feature, Gallery } from "@/components";
import { client } from "@/lib";

type Props = {
  params: {
    handle: string;
  };
};

async function getProduct(handle: string) {
  const region = await client.regions.list().then((res) => res.regions[0]);

  const res = await client.products.list({
    handle: handle,
    region_id: region.id,
    expand: 'categories,variants,variants.options,variants.prices,images,options'
  });

  const product = res.products?.[0];

  if (!product) {
    throw new Error(`Product with handle ${handle} not found`);
  }

  return product;
}

export default async function Product({ params: { handle } }: Props) {
  const product = await getProduct(handle);
  const firstCategory = product.categories?.[0]

  return (
    <div className="flex items-start justify-center">
      <div className="max-w-7xl w-full">
        <div className="w-full flex items-start gap-x-16 mb-16">
          <div className="w-2/3">
            <Gallery images={product.images} />
          </div>

          <div className="w-1/3">
            <Details product={product} />
          </div>
        </div>

        <Divider />

        <div className="py-16">
          {
            firstCategory && (
              /* @ts-ignore */
              <Feature
                query={{
                  order: "-created_at",
                  category_id: [firstCategory.id]
                }}
                title={`More ${firstCategory.name}`}
                max={3}
                to={{
                  href: `/category/${firstCategory.handle}`,
                  label: "View all",
                }}
              />
            )
          }

          {
            !firstCategory && (
              /* @ts-ignore */
              <Feature
                query={{
                  order: "-created_at",
                }}
                title={"Latest"}
                max={3}
                to={{
                  href: "/products",
                  label: "View all",
                }}
              />
            )
          }
        </div>
      </div>
    </div>
  );
}
