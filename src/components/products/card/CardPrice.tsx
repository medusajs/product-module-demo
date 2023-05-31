import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { formatPrice } from "@/lib";

type Props = {
  product: PricedProduct;
};

const Price = ({ product, ...props }: Props) => {
  const calculatedPrice = product.variants[0].calculated_price_incl_tax;
  const originalPrice = product.variants[0].original_price_incl_tax;

  const hasDiff = calculatedPrice !== originalPrice;

  return (
    <div className="flex flex-col h-full justify-between items-end">
      <div className="text-base-light dark:text-base-dark">
        {formatPrice(
          calculatedPrice,
          product.variants?.[0].prices?.[0].currency_code
        )}
      </div>
      {hasDiff && (
        <div className="text-labels-xsmall line-through text-icon-subtle-light dark:text-icon-subtle-dark">
          {formatPrice(
            originalPrice,
            product.variants?.[0].prices?.[0].currency_code
          )}
        </div>
      )}
    </div>
  );
};

export default Price;
