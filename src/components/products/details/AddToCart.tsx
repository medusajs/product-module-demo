"use client";

import { Button } from "@/components";
import { client } from "@/lib";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { useCookies } from "react-cookie";

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
  const [cookie] = useCookies(["cartId"]);
  const lineItem = {
    variant_id: product.variants[0].id || product.id || "",
    quantity: 1,
  };

  async function handleAdd() {
    console.log("adding to cart...");
    if (!lineItem.variant_id) {
      console.log({ id: lineItem.variant_id });

      return;
    }

    // setAdding(true);
    console.log({ id: lineItem.variant_id });

    await addToCart(cookie.cartId, lineItem);

    // setAdding(false);

    // startTransition(() => {
    //   router.refresh();
    // });
  }

  return <Button onClick={handleAdd}>Add to Bag</Button>;
}
