import { Grid } from "@/components";
import { PricedProduct } from "@medusajs/client-types";

type Props = {
  max?: number;
  products: PricedProduct[];
  children?: React.ReactNode;
};

const Feature = ({ max, products, children }: Props) => {
  return (
    <div className="flex flex-col gap-y-6">
      {children}
      <Grid products={products} max={max} />
    </div>
  );
};

export default Feature;
