import clsx from "clsx";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  variant?: "neutral" | "blue";
  size?: "small" | "medium";
}>;

const Tag = ({ variant = "neutral", size = "medium", children }: Props) => {
  return (
    <div
      className={clsx(
        "rounded-md inline-flex items-center justify-center text-labels-xsmall font-medium",
        {
          "bg-tag-neutral-light dark:bg-tag-neutral-dark border border-tag-neutral-light dark:border-tag-neutral-dark text-tag-neutral-light dark:text-tag-neutral-dark":
            variant === "neutral",
          "bg-tag-blue-light dark:bg-tag-blue-dark border border-tag-blue-light dark:border-tag-blue-dark text-tag-blue-light dark:text-tag-blue-dark":
            variant === "blue",
        },
        {
          "py-0.5 px-2": size === "medium",
          "px-1.5": size === "small",
        }
      )}
    >
      {children}
    </div>
  );
};

export default Tag;
