import {startTransition, useState} from "react";
import { ChevronUpDown } from "../icons";
import { client } from "@/lib";
import { LineItem } from "@medusajs/medusa";
import { useRouter } from "next/navigation";
import {LoadingDots} from "@/components/common/loading-dots";

type Props = {
  item: LineItem;
};

const EditItemQuantityButton = ({ item }: Props) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false)

  async function handleUpdate({
    item,
    quantity,
  }: {
    item: LineItem;
    quantity: number;
  }) {
    setIsLoading(true)

    try {
      await client.carts.lineItems.update(item.cart_id, item.id, { quantity });
      startTransition(() => {
        router.refresh();
      });
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <LoadingDots className="bg-white" />
  }

  return (
    <div className="flex items-center">
      <select
        className="flex flex-row p-1 bg-base-light dark:bg-base-dark text-base-light dark:text-base-dark appearance-none cursor-pointer"
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
      </select>
      <ChevronUpDown />
    </div>
  );
};

export default EditItemQuantityButton;
