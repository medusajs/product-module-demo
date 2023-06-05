import { client } from "@/lib";
import { LineItem } from "@medusajs/medusa/dist/models/line-item";
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

    setRemoving(false);

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <button
      className={`text-error-light dark:text-error-dark text-labels-small ${
        removing ? "cursor-not-allowed px-0" : ""
      }`}
      onClick={() => handleRemove(cart_id, id)}
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
