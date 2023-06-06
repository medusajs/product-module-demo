import { CombinationMarkLogo, ShoppingBag } from "@/components/icons";
import Cart from "@/components/cart";
import Link from "next/link";
import { Suspense } from "react";

const Nav = async () => {
  return (
    <nav className="flex items-center justify-center bg-base-light dark:bg-base-dark h-[73px] border-b border-base-light dark:border-base-dark px-4 sm:px-8">
      <div className="flex items-center justify-between w-full max-w-7xl">
        <div className="text-icon-base-light dark:text-icon-base-dark">
          <Link href="/">
            <CombinationMarkLogo role="img" />
          </Link>
        </div>
        <div className="text-icon-subtle-light dark:text-icon-subtle-dark flex items-center gap-x-4">
          <Suspense fallback={<ShoppingBag className="h-6" />}>
            {/* @ts-expect-error Async Server Component */}
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
