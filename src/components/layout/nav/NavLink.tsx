"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = React.ComponentProps<typeof Link>;

const NavLink = ({ href, children, ...rest }: Props) => {
  const activePath = usePathname();

  const isActive = activePath === href;

  return (
    <Link {...rest} href={href}>
      <p
        className={clsx("text-labels-small font-medium", {
          "text-base-light dark:text-base-dark": isActive,
          "text-subtle-light dark:text-subtle-dark": !isActive,
        })}
      >
        {children}
      </p>
    </Link>
  );
};

export default NavLink;
