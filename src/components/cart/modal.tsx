import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { ShoppingBag, XMark } from "../icons";
import { Cart } from "@medusajs/medusa/dist/models/cart";

// import DeleteItemButton from "./delete-item-button";
// import EditItemQuantityButton from "./edit-item-quantity-button";
import { Price } from "../common/price";
import CartDivider from "./CartDivider";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal({
  isOpen,
  onClose,
  cart,
}: {
  isOpen: boolean;
  onClose: () => void;
  cart: Omit<Cart, "beforeInsert">;
}) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <Dialog
          as={motion.div}
          initial="closed"
          animate="open"
          exit="closed"
          key="dialog"
          static
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          <motion.div
            variants={{
              open: { opacity: 1, backdropFilter: "blur(0.5px)" },
              closed: { opacity: 0, backdropFilter: "blur(0px)" },
            }}
            className="fixed inset-0 bg-black/30"
            aria-hidden="true"
          />

          <div className="fixed inset-0 flex justify-end" data-testid="cart">
            <Dialog.Panel
              as={motion.div}
              variants={{
                open: { translateX: 0 },
                closed: { translateX: "100%" },
              }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="flex w-full flex-col rounded-lg bg-white text-black dark:bg-base-dark dark:text-white dark:shadow-card-hover-dark md:w-3/5 lg:w-2/5 m-2"
            >
              <div className="flex items-center justify-between p-8">
                <h3 className="text-headers-h3 text-base-light dark:text-base-dark">
                  Shopping Bag
                </h3>
                <button
                  aria-label="Close cart"
                  onClick={onClose}
                  className="text-black transition-colors hover:text-gray-500 dark:text-gray-100"
                  data-testid="close-cart"
                >
                  <XMark className="h-7" />
                </button>
              </div>

              <CartDivider />

              {cart.items?.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden p-8">
                  <ShoppingBag className="h-16" />
                  <p className="mt-6 text-center font-medium text-base-light dark:text-base-dark">
                    Your shopping bag is empty.
                  </p>
                </div>
              ) : null}
              {cart.items?.length !== 0 ? (
                <div className="flex h-full flex-col justify-between overflow-hidden p-8">
                  <ul className="flex-grow overflow-auto p-6">
                    {cart.items.map((item, i) => {
                      const merchandiseUrl = `/product/${item.variant.product.handle}`;

                      return (
                        <li key={i} data-testid="cart-item">
                          <Link
                            className="flex flex-row space-x-4 py-4"
                            href={merchandiseUrl}
                            onClick={onClose}
                          >
                            <div className="relative h-16 w-16 cursor-pointer overflow-hidden bg-white">
                              <Image
                                className="h-full w-full object-cover"
                                width={64}
                                height={64}
                                alt={item.variant.product.title || ""}
                                src={
                                  item.thumbnail ||
                                  item.variant.product.images[0].url
                                }
                              />
                            </div>
                            <div className="flex flex-1 flex-col text-base">
                              <span className="font-semibold">
                                {item.title}
                              </span>
                            </div>
                            {item.total && (
                              <Price
                                className="flex flex-col justify-between space-y-2 text-sm"
                                amount={item.total}
                                currency={cart.region.currency_code}
                              />
                            )}
                          </Link>
                          {/* <div className="flex h-9 flex-row">
                            <DeleteItemButton item={item} />
                            <p className="ml-2 flex w-full items-center justify-center border dark:border-gray-700">
                              <span className="w-full px-2">
                                {item.quantity}
                              </span>
                            </p>
                            <EditItemQuantityButton item={item} type="minus" />
                            <EditItemQuantityButton item={item} type="plus" />
                          </div> */}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="border-t border-gray-200 pt-2 text-sm text-black dark:text-white">
                    <div className="mb-2 flex items-center justify-between">
                      <p>Subtotal</p>
                      <Price
                        amount={cart.subtotal || 0}
                        currency={cart.region.currency_code}
                      />
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                      <p>Taxes</p>
                      <Price
                        className="text-right"
                        amount={cart.tax_total || 0}
                        currency={cart.region.currency_code}
                      />
                    </div>
                    <div className="mb-2 flex items-center justify-between border-b border-gray-200 pb-2">
                      <p>Shipping</p>
                      <p className="text-right">Calculated at checkout</p>
                    </div>
                    <div className="mb-2 flex items-center justify-between font-bold">
                      <p>Total</p>
                      <Price
                        className="text-right"
                        amount={cart.total || 0}
                        currency={cart.region.currency_code}
                      />
                    </div>
                  </div>
                  <a
                    href="/"
                    className="flex w-full items-center justify-center bg-black p-3 text-sm font-medium uppercase text-white opacity-90 hover:opacity-100 dark:bg-white dark:text-black"
                  >
                    <span>Proceed to Checkout</span>
                  </a>
                </div>
              ) : null}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
