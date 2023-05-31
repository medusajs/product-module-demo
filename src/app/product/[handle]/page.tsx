import { Details, Divider, Image, Modal } from "@/components";

type Props = {
  params: {
    handle: string;
  };
};

async function getProduct(handle: string) {
  const res = await fetch(
    `http://localhost:3000/api/products?handle=${handle}`
  ).then((res) => res.json());

  const product = res.all_products_section.products[0];

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
        <Divider />
        <div className="py-16"></div>
      </div>
    </Modal>
  );
}
``;
