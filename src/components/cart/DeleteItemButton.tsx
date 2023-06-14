import { client } from "@/lib";
import { LineItem } from "@medusajs/client-types";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { LoadingDots } from "../common/loading-dots";

type Props = {
  item: LineItem;
};

export default function DeleteItemButton({ item }: Props) {
  const { cart_id, id } = item;
  const router = useRouter();
  const [removing, setRemoving] = useState(false);

  async function handleRemove(cartId: string, id: string) {
    if (!cartId || !id) return;

    setRemoving(true);

    const res = await client.carts.lineItems.delete(cartId, id);
    const cart = res.cart;

    if (!cart) {
      throw new Error(`Error fetching cart with id ${cartId}`);
    }

    gtag("event", "remove_from_cart", {
      page_path: window.location.pathname,
      item_id: id,
      send_to: process.env.NEXT_PUBLIC_GA_ID,
    });

    startTransition(() => {
      router.refresh();
      setRemoving(false);
    });
  }

  return (
    <button
      className={`text-error-light dark:text-error-dark text-labels-small ${
        removing ? "cursor-not-allowed px-0" : ""
      }`}
      onClick={() => handleRemove(cart_id!, id)}
      disabled={removing}
    >
      {removing ? (
        <LoadingDots className="bg-base-dark dark:bg-base-light" />
      ) : (
        "Remove"
      )}
    </button>
  );
}
