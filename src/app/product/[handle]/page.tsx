import { Details, Image, Modal } from "@/components";
import { client } from "@/lib";

type Props = {
  params: {
    handle: string;
  };
};

async function getProduct(handle: string) {
  const region = await client.regions.list().then((res) => res.regions[0]);

  const product = await client.products
    .list({
      handle,
      expand: "variants,variants.prices,tags,categories",
      region_id: region.id ?? undefined,
    })
    .then((res) => res.products[0]);

  if (!product) {
    throw new Error(`Product with handle ${handle} not found`);
  }

  return product;
}

export default async function ProductModal({ params: { handle } }: Props) {
  const product = await getProduct(handle);
  return (
    <Modal>
      <div className="w-full">
        <div className="w-full flex gap-x-16 items-center mb-16">
          <div className="w-2/3">
            <Image src={product.thumbnail} alt={""} />
          </div>
          <div className="w-1/3">
            <Details product={product} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
``;
