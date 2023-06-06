import clsx from "clsx";
import { PropsWithChildren } from "react";
import { Tag } from "../common";

type Props = PropsWithChildren & {
  tag?: string;
  className: string;
};

const HoverModal = ({ tag, className, children }: Props) => {
  return (
    <div
      className={clsx(
        className,
        "absolute hidden bottom-16 h-fit p-3 text-subtle-light dark:text-subtle-dark font-medium shadow-card-hover-light dark:shadow-card-hover-dark rounded-2xl bg-base-light dark:bg-base-dark"
      )}
    >
      {children}
      {tag && <Tag>{tag}</Tag>}
    </div>
  );
};

export default HoverModal;
