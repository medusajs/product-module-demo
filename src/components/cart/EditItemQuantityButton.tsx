import { startTransition, useState, useTransition } from "react";
import { ChevronUpDown } from "../icons";
import { client } from "@/lib";
import { LineItem } from "@medusajs/medusa";
import { useRouter } from "next/navigation";

type Props = {
  item: LineItem;
};

const EditItemQuantityButton = ({ item }: Props) => {
  const router = useRouter();

  async function handleUpdate({
    item,
    quantity,
  }: {
    item: LineItem;
    quantity: number;
  }) {
    await client.carts.lineItems.update(item.cart_id, item.id, { quantity });
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <>
      <select
        className="flex flex-row p-1 bg-base-light dark:bg-base-dark text-base-light dark:text-base-dark"
        value={item.quantity}
        onChange={(e) =>
          handleUpdate({ item, quantity: parseInt(e.target.value) })
        }
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option value={n} key={n}>
            {n}
          </option>
        ))}
        <ChevronUpDown />
      </select>
    </>
  );
};

export default EditItemQuantityButton;
