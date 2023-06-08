import { PricedProduct } from "@medusajs/client-types";

type Props = {
  description: PricedProduct["description"];
};

const Description = ({ description }: Props) => {
  if (!description) {
    return null;
  }

  return (
    <p className="text-icon-subtle-light dark:text-icon-subtle-dark text-body-regular">
      {description}
    </p>
  );
};

export default Description;
