import {
  CombinationMarkLogo,
  MagnifyingGlass,
  ShoppingBag,
} from "@/components/icons";
import { client } from "@/lib";
import Link from "next/link";
import NavLink from "./NavLink";

async function getCategories() {
  const res = client.productCategories.list({
    limit: 3,
    include_descendants_tree: false,
  });

  return res;
}

const Nav = async () => {
  const { product_categories } = await getCategories();

  return (
    <nav className="flex items-center justify-center bg-base-light dark:bg-base-dark h-[73px] border-b border-base-light dark:border-base-dark">
      <div className="flex items-center justify-between w-full max-w-7xl">
        <div className="text-icon-base-light dark:text-icon-base-dark">
          <Link href="/">
            <CombinationMarkLogo role="img" />
          </Link>
        </div>
        <div className="flex items-center gap-x-6">
          <NavLink href="/">Discover</NavLink>
          {product_categories?.map((category) => {
            return (
              <NavLink key={category.id} href={`/category/${category.handle}`}>
                {category.name}
              </NavLink>
            );
          })}
        </div>
        <div className="text-icon-subtle-light dark:text-icon-subtle-dark flex items-center gap-x-4">
          <MagnifyingGlass />
          <ShoppingBag />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
