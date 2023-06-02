"use client";

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
            "Sorry you can't do that.",
            "That action isn't part of the demo.",
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
            "Sorry you can't do that.",
            "That action isn't part of the demo.",
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
