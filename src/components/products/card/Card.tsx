import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import Link from "next/link";
import Info from "./Info";
import Thumbnail from "./Thumbnail";

type Props = {
  product: PricedProduct;
};

const Card = ({ product }: Props) => {
  return (
    <Link href={`/product/${product.handle}`}>
      <div className="shadow-card-hover-light dark:shadow-card-hover-dark rounded-2xl overflow-hidden w-full group/card bg-bg-base-light dark:bg-bg-base-dark">
        <Thumbnail thumbnail={product.thumbnail} alt={product.title} />
        <Info product={product} />
      </div>
    </Link>
  );
};

export default Card;
