import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

type Props = {
  product: PricedProduct;
};

const Price = ({ product }: Props) => {
  const calculatedPrice = product.variants[0].calculated_price_incl_tax;
  const originalPrice = product.variants[0].original_price_incl_tax;

  const formatPrice = (price: number | null) => {
    const formatter = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: product.variants?.[0].prices?.[0].currency_code || "usd",
    });

    if (!price) {
      return formatter.format(0);
    }

    return formatter.format(price / 100);
  };

  const hasDiff = calculatedPrice !== originalPrice;

  return (
    <div className="flex items-end gap-x-3">
      <div>
        <p className="text-headers-h3 text-base-light dark:text-base-dark font-medium">
          {formatPrice(calculatedPrice)}
        </p>
      </div>
      {hasDiff && (
        <div>
          <p className="line-through font-medium text-[18px,28px] text-icon-subtle-light dark:text-icon-subtle-dark">
            {formatPrice(originalPrice)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Price;
