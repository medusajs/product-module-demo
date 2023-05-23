"use client";

import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

import { Cart } from "@medusajs/medusa/dist/models/cart";

import CartModal from "./CartModal";

import { ShoppingBag } from "../icons";

export default function CartButton({
  cart,
  cartIdUpdated,
}: {
  cart: Omit<Cart, "beforeInsert">;
  cartIdUpdated: boolean;
}) {
  const [, setCookie] = useCookies(["cartId"]);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const quantityRef = useRef(cart.items.length);

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
        <ShoppingBag isEmpty={!cart.items.length} />
      </button>
    </>
  );
}
