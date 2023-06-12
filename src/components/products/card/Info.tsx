import { Tags } from "@/components";
import { PricedProduct } from "@medusajs/client-types";
import CardPrice from "./CardPrice";

type Props = {
  product: PricedProduct;
};

const Info = ({ product }: Props) => {
  return (
    <div className="p-6 w-full min-h-[150px] flex flex-col gap-y-3">
      <div className="flex items-start justify-between font-medium text-labels-large">
        <div className="flex flex-col gap-y-3">
          <p>{product.title}</p>
          <p className={"text-subtle-light dark:text-subtle-dark"}>{product.description}</p>
          <Tags tags={product.tags} categories={product.categories} />
        </div>
      </div>
    </div>
  );
};

export default Info;
