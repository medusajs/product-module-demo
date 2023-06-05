type Props = {
  amount: number;
  currency?: string;
} & React.ComponentProps<"p">;

const Price = ({ amount, currency = "usd", ...props }: Props) => {
  const formatPrice = (price: number | null) => {
    const formatter = Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    });

    if (!price) {
      return formatter.format(0);
    }

    return formatter.format(price / 100);
  };

  return <p {...props}>{formatPrice(amount)}</p>;
};

export default Price;
