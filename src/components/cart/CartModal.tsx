import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { ShoppingBag, XMark } from "../icons";
import { Cart } from "@medusajs/medusa/dist/models/cart";

import DeleteItemButton from "./DeleteItemButton";
import EditItemQuantityButton from "./EditItemQuantityButton";
import { Price } from "../common/price";
import CheckoutButtons from "./CheckoutButtons";
import { NotificationProvider } from "../common";

export default function CartModal({
  isOpen = true,
  onClose,
  cart,
}: {
  isOpen: boolean;
  onClose: () => void;
  cart: Omit<Cart, "beforeInsert">;
}) {
  return (
    <NotificationProvider>
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
            className="relative z-40"
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
                className="flex w-full flex-col rounded-lg bg-white text-black dark:bg-base-dark dark:text-white dark:shadow-card-hover-dark md:w-2/5 lg:w-1/3 m-2"
              >
                <div className="flex items-center justify-between border-b border-[#2E2E32] p-8">
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

                {cart.items?.length === 0 ? (
                  <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden p-8">
                    <ShoppingBag className="h-16" />
                    <p className="mt-6 text-center font-medium text-base-light dark:text-base-dark">
                      Your shopping bag is empty.
                    </p>
                  </div>
                ) : null}
                {cart.items?.length !== 0 ? (
                  <div className="flex flex-col justify-between overflow-hidden h-full">
                    <div className="overflow-auto flex-grow">
                      <ul className="flex flex-col w-full">
                        {cart.items.map((item, i) => {
                          const merchandiseUrl = `/product/${item.variant.product.handle}`;

                          return (
                            <li
                              key={i}
                              data-testid="cart-item"
                              className="flex justify-between flex-row items-center gap-5 border-b border-[#2E2E32] px-8 py-6"
                            >
                              <div className="flex flex-row justify-between w-full">
                                <Link
                                  className="flex flex-row space-x-4"
                                  href={merchandiseUrl}
                                  onClick={onClose}
                                >
                                  <div className="relative h-14 w-18 cursor-pointer overflow-hidden bg-white rounded">
                                    <Image
                                      className="h-14 w-18 object-cover"
                                      width={72}
                                      height={56}
                                      alt={item.variant.product.title || ""}
                                      src={
                                        item.thumbnail ||
                                        item.variant.product.images[0].url
                                      }
                                    />
                                  </div>
                                  <div className="flex flex-1 flex-col justify-center">
                                    <span className="text-labels-regular font-medium">
                                      {item.title}
                                    </span>
                                  </div>
                                </Link>
                                <EditItemQuantityButton item={item} />
                              </div>
                              <div>
                                {item.total && (
                                  <Price
                                    className="flex flex-col justify-between space-y-2 text-sm"
                                    amount={item.total}
                                    currency={cart.region.currency_code}
                                  />
                                )}
                                <DeleteItemButton item={item} />
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="flex flex-col h-fit justify-between">
                      <div className="text-labels-regular text-subtle-light dark:text-subtle-dark border-t border-[#2E2E32] font-medium px-8 py-6">
                        <div className="mb-2 flex items-center justify-between">
                          <p>Subtotal</p>
                          <Price
                            amount={cart.subtotal || 0}
                            currency={cart.region.currency_code}
                          />
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                          <p>Delivery</p>
                          <p className="text-right">Free</p>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                          <p>Total</p>
                          <Price
                            className="text-right text-base-light dark:text-base-dark"
                            amount={cart.total || 0}
                            currency={cart.region.currency_code}
                          />
                        </div>
                      </div>
                      <CheckoutButtons />
                    </div>
                  </div>
                ) : null}
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </NotificationProvider>
  );
}
