"use client";

import { PricedProduct } from "@medusajs/client-types";
import Link from "next/link";
import Info from "./Info";
import Thumbnail from "./Thumbnail";

type Props = {
  product: PricedProduct;
};

type TrackCategoryProps = {
  categoryId: string | undefined;
  categoryName: string | undefined;
};

async function trackCategory({
  categoryId,
  categoryName,
}: TrackCategoryProps): Promise<void> {
  if (!categoryId || !categoryName) return;

  await fetch("/api/category-tracker", {
    method: "POST",
    body: JSON.stringify({
      categoryId,
      categoryName,
    }),
  });
}

const Card = ({ product }: Props) => {
  const categoryId = product.categories?.[0]?.id;
  const categoryName = product.categories?.[0]?.name;
  return (
    <Link
      scroll={false}
      href={`/product/${product.handle}`}
      onClick={() => trackCategory({ categoryId, categoryName })}
    >
      <div className="shadow-card-hover-light dark:shadow-card-hover-dark rounded-2xl overflow-hidden w-full group/card bg-base-light dark:bg-base-dark">
        <Thumbnail thumbnail={product.thumbnail} alt={product.title} />
        <Info product={product} />
      </div>
    </Link>
  );
};

export default Card;
