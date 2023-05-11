import { ArrowUpRight, Grid } from "@/components";
import { client } from "@/lib";
import { StoreGetProductsParams } from "@medusajs/medusa";
import Link from "next/link";

type Props = {
  title: string;
  query: Omit<StoreGetProductsParams, "limit">;
  max?: number;
  to?: {
    href: string;
    label: string;
  };
};

const getProducts = async ({ query, max }: Omit<Props, "title">) => {
  const res = await client.products.list({
    limit: max,
    ...query,
  });

  return res;
};

const Feature = async ({ query, max, title, to }: Props) => {
  const { products } = await getProducts({ query, max });

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-headers-h3">{title}</h3>
        {to && (
          <Link href={to.href}>
            <div className="inline-flex items-center text-labels-xsmall text-icon-subtle-light dark:text-icon-subtle-dark gap-x-1">
              <ArrowUpRight />
              <span>{to.label}</span>
            </div>
          </Link>
        )}
      </div>
      <Grid products={products} max={3} />
    </div>
  );
};

export default Feature;
