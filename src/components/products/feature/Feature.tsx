"use client";

import { ArrowUpRight, Grid } from "@/components";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  max?: number;
  to?: {
    href: string;
    label: string;
  };
  products: PricedProduct[];
};

const Feature = ({ max, title, description, to, products }: Props) => {
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
      <p
        className="text-subtle-dark"
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>
      <Grid products={products} max={max} />
    </div>
  );
};

export default Feature;
