import { client } from "@/lib";
import { cookies } from "next/headers";
import CartButton from "./button";

async function createCart() {
  console.log("creating cart");
  const res = await client.carts.create();
  const cart = res.cart;

  if (!cart) {
    throw new Error(`Cart not created`);
  }

  return cart;
}

async function getCart(cartId: string) {
  console.log("getting cart");
  const res = await client.carts.retrieve(cartId);
  const cart = res.cart;

  if (!cart) {
    throw new Error(`Cart with id ${cartId} not found`);
  }

  return cart;
}

export default async function Cart() {
  const cartId = cookies().get("cartId")?.value;
  let cartIdUpdated = false;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  // If the `cartId` from the cookie is not set or the cart is empty
  // (old carts becomes `null` when you checkout), then get a new `cartId`
  //  and re-fetch the cart.
  if (!cartId || !cart) {
    cart = await createCart();
    cartIdUpdated = true;
  }

  return <CartButton cart={cart} cartIdUpdated={cartIdUpdated} />;
}
