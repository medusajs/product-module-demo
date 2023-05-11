"use client";

import { useMemo } from "react";
import { useInteractive } from "./Interactive";

const SignUp = () => {
  const { variant } = useInteractive();

  const isSoldOut = useMemo(() => {
    if (!variant) {
      return false;
    }

    return (
      variant.inventory_quantity === 0 && variant.allow_backorder === false
    );
  }, [variant]);

  if (!isSoldOut) {
    return null;
  }

  return (
    <div className="border border-gray-200 p-3 w-full rounded-sm">
      <p>Sold out</p>
    </div>
  );
};
