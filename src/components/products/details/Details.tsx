import { Button } from "@/components/common";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { Tags } from "../tags";
import Description from "./Description";
import Price from "./Price";
import Title from "./Title";

type Props = {
  product: PricedProduct;
};

const Details = ({ product }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <Title title={product.title} />
          <Price product={product} />
        </div>
        <div className="flex flex-col gap-y-4">
          <Tags tags={product.tags} categories={product.categories} />
          <Description description={product.description} />
        </div>
        <Button>Add to Bag</Button>
      </div>
    </div>
  );
};

export default Details;
