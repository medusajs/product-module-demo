import { PricedProduct } from "@medusajs/client-types";
import { Tags } from "../tags";
import Description from "./Description";
import ProductPrice from "./ProductPrice";
import Title from "./Title";
import AddToCart from "./AddToCart";

type Props = {
  product: PricedProduct;
};

const Details = ({ product }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <Title title={product.title} />
          <ProductPrice product={product} />
        </div>
        <div className="flex flex-col gap-y-4">
          <Tags tags={product.tags} categories={product.categories} />
          <Description description={product.description} />
        </div>
        <AddToCart product={product} />
      </div>
    </div>
  );
};

export default Details;
