import { Price } from "@/components/common/price";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

type Props = {
  product: PricedProduct;
};

const ProductPrice = ({ product }: Props) => {
  const calculatedPrice = product.variants[0].calculated_price_incl_tax ?? 0;
  const originalPrice = product.variants[0].original_price_incl_tax;
  const hasDiff = originalPrice && calculatedPrice !== originalPrice;

  return (
    <div className="flex items-end gap-x-3">
      <div>
        <Price
          className="font-medium text-headers-h3 text-base-light dark:text-base-dark"
          amount={calculatedPrice}
          currency={product.variants?.[0].prices?.[0].currency_code}
        />
      </div>
      {hasDiff && (
        <div>
          <Price
            className="font-medium line-through text-[18px,28px] text-icon-subtle-light dark:text-icon-subtle-dark"
            amount={originalPrice}
            currency={product.variants?.[0].prices?.[0].currency_code}
          />
        </div>
      )}
    </div>
  );
};

export default ProductPrice;
