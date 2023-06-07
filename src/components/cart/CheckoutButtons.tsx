"use client";

import { useEffect } from "react";
import { Button } from "../common";
import { useNotifications } from "../common/notification/NotificationProvider";

const CheckoutButtons = () => {
  const { showNotification, hideNotification } = useNotifications();

  return (
    <div className="border-t border-[#2E2E32] p-8 flex flex-row justify-between gap-4 z-0">
      <Button
        className="w-1/2"
        variant="inverted"
        onClick={() =>
          showNotification(
            "error",
            "This action is not part of the demo.",
            <span>You can learn how to set up payment plugins with Medusa <a className="font-bold cursor-pointer" href="https://docs.medusajs.com/plugins/payment">here</a></span>,
            hideNotification
          )
        }
      >
        Pay with Apple Pay
      </Button>
      <Button
        className="w-1/2"
        variant="primary"
        onClick={() =>
          showNotification(
            "error",
            "This action is not part of the demo.",
            <span>You can learn how to set up payment plugins with Medusa <a className="font-bold cursor-pointer" href="https://docs.medusajs.com/plugins/payment">here</a></span>,
            hideNotification
          )
        }
      >
        Go to Payment
      </Button>
    </div>
  );
};

export default CheckoutButtons;
