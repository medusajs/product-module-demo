import { PricedProduct } from "@medusajs/client-types";

type Props = {
  title: PricedProduct["title"];
};

const Title = ({ title }: Props) => {
  if (!title) {
    return null;
  }

  return (
    <h1 className="font-medium text-headers-h2 text-base-light dark:text-base-dark">
      {title}
    </h1>
  );
};

export default Title;
