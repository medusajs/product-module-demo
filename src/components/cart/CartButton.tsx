"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

import { Cart } from "@medusajs/client-types";

import CartModal from "./CartModal";

import { ShoppingBag } from "../icons";

export default function CartButton({
  cart,
  cartIdUpdated,
}: {
  cart: Cart;
  cartIdUpdated: boolean;
}) {
  const [, setCookie] = useCookies(["cartId"]);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const router = useRouter();
  const quantity = (cart.items ?? []).reduce(
    (sum, lineItem) => sum + lineItem.quantity,
    0
  );
  const quantityRef = useRef(quantity);

  useEffect(() => {
    if (cartIdUpdated) {
      setCookie("cartId", cart.id, {
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
    }
    return;
  }, [setCookie, cartIdUpdated, cart.id]);

  useEffect(() => {
    if (quantity !== quantityRef.current) {
      setCartIsOpen(true);
    }
    startTransition(() => router.refresh());
  }, [quantity]);

  return (
    <>
      <CartModal
        isOpen={cartIsOpen}
        onClose={() => setCartIsOpen(false)}
        cart={cart}
      />

      <button
        aria-label="Open cart"
        onClick={() => {
          setCartIsOpen(true);
        }}
        className="relative right-0 top-0"
        data-testid="open-cart"
      >
        <ShoppingBag isEmpty={!cart.items?.length} />
      </button>
    </>
  );
}
