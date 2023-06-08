import { Card } from "@/components";
import { PricedProduct } from "@medusajs/client-types";

type Props = {
  products?: PricedProduct[];
  max?: number;
};

const Grid = ({ products = [], max }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
      {products.slice(0, max).map((product) => {
        return <Card key={product.id} product={product} />;
      })}
    </div>
  );
};

export default Grid;
