"use client";

import { Button } from "@/components";
import { client } from "@/lib";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { startTransition, useEffect, useState } from "react";

import { useCookies } from "react-cookie";
import { LoadingDots } from "@/components/common/loading-dots";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/components/common/notification/NotificationProvider";

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
    throw new Error(`Couldn't add item with id ${lineItem.variant_id} to cart`);
  }

  return cart;
}

export default function AddToCart({ product }: Props) {
  const [cookie] = useCookies(["cartId"]);
  const [adding, setAdding] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const router = useRouter();
  const { showNotification, hideNotification } = useNotifications();

  const lineItem = {
    variant_id: product.variants[0].id || product.id || "",
    quantity: 1,
  };

  async function handleAdd() {
    if (!lineItem.variant_id) return;

    setAdding(true);

    try {
      await addToCart(cookie.cartId, lineItem);
      showNotification(
        "success",
        "Added to shopping bag",
        `${product.title} is successfully added.`,
        hideNotification
      );
    } catch (e) {
      let message;
      if (e instanceof Error) message = e.message;
      else message = String(e);
      showNotification(
        "error",
        "Error adding to bag",
        message,
        hideNotification
      );
    }

    setAdding(false);

    startTransition(() => {
      router.refresh();
      router.back();
    });
  }

  useEffect(() => {
    showNotif && setTimeout(() => setShowNotif(false), 5000);
  }, [showNotif]);

  return (
    <>
      <Button onClick={handleAdd} disabled={adding}>
        {adding ? (
          <LoadingDots className="bg-base-dark dark:bg-base-light" />
        ) : (
          "Add to Bag"
        )}
      </Button>
    </>
  );
}
