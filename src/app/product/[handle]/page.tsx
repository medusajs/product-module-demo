import { Details, Image, Modal } from "@/components";

type Props = {
  params: {
    handle: string;
  };
};

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getProduct(handle: string) {
  const res = await fetch(
    `${NEXT_PUBLIC_API_URL}/api/products?handle=${handle}`
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
      </div>
    </Modal>
  );
}
``;
