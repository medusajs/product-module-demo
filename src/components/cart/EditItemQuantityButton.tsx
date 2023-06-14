import { startTransition, useState } from "react";
import { ChevronUpDown } from "../icons";
import { client } from "@/lib";
import { useRouter } from "next/navigation";
import { LoadingDots } from "@/components/common/loading-dots";
import { LineItem } from "@medusajs/client-types";

type Props = {
  item: LineItem;
};

const EditItemQuantityButton = ({ item }: Props) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdate({
    item,
    quantity,
  }: {
    item: LineItem;
    quantity: number;
  }) {
    setIsLoading(true);

    gtag("event", "change_cart_quantity", {
      page_path: window.location.pathname,
      item_id: item.id,
      send_to: process.env.NEXT_PUBLIC_GA_ID,
    });

    try {
      await client.carts.lineItems.update(item.cart_id!, item.id, { quantity });
      startTransition(() => {
        router.refresh();
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingDots className="bg-white" />;
  }

  return (
    <div className="flex items-center cursor-pointer relative">
      <select
        className="flex flex-row p-1 bg-transparent text-base-light dark:text-base-dark appearance-none cursor-pointer pr-5 z-50"
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
      <ChevronUpDown className="absolute left-4" />
    </div>
  );
};

export default EditItemQuantityButton;
