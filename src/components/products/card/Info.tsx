import { Tags } from "@/components";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

type Props = {
  product: PricedProduct;
};

const Info = ({ product }: Props) => {
  return (
    <div className="p-6 w-full h-[106px] flex flex-col gap-y-3">
      <div className="flex items-center justify-between font-medium text-labels-large">
        <p>{product.title}</p>
        <p>$16</p>
      </div>
      <Tags tags={product.tags} />
    </div>
  );
};

export default Info;
