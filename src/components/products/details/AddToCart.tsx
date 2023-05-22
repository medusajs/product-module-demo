"use client";

import { Button } from "@/components";
import { client } from "@/lib";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { LoadingDots } from "@/components/common/loading-dots";

type Props = {
  product: PricedProduct;
};

type LineItem = {
  variant_id: string;
  quantity: number;
};

async function addToCart(cartId: string, lineItem: LineItem) {
  const res = await client.carts.lineItems.create(cartId, lineItem);
  const cart = res.cart;

  if (!cart) {
    throw new Error(
      `Couldn't add lineitem with id ${lineItem.variant_id} to cart`
    );
  }

  return cart;
}

export default function AddToCart({ product }: Props) {
  const router = useRouter();
  const [cookie] = useCookies(["cartId"]);
  const [adding, setAdding] = useState(false);

  const lineItem = {
    variant_id: product.variants[0].id || product.id || "",
    quantity: 1,
  };

  async function handleAdd() {
    if (!lineItem.variant_id) return;

    setAdding(true);

    await addToCart(cookie.cartId, lineItem);

    setAdding(false);

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <Button onClick={handleAdd} disabled={adding}>
      {adding ? (
        <LoadingDots className="bg-base-dark dark:bg-base-light" />
      ) : (
        "Add to Bag"
      )}
    </Button>
  );
}
