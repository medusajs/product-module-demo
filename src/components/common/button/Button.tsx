import clsx from "clsx";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  variant?: "primary" | "inverted";
}> &
  React.ComponentProps<"button">;

const Button = ({ variant = "primary", children, ...props }: Props) => {
  const bg = {
    primary:
      "bg-gradient-to-b from-white dark:from-[#2E2E32] to-[#F8F9FA] dark:to-[#28282C] text-base-light dark:text-base-dark border-neutral-button-light dark:border-neutral-button-dark",
    inverted:
      "bg-gradient-to-b from-[#26292B] dark:from-white to-[#151718] dark:to-[#F4F2F4] text-base-light",
  }[variant];

  return (
    <button
      onClick={props.onClick}
      className={clsx(
        props.className,
        bg,
        "text-labels-regular font-medium py-[9px] rounded-[7px] border"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
