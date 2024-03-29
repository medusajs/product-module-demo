import clsx from "clsx";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  variant?: "primary" | "inverted";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  left?: boolean;
}>;

const Button = ({
  variant = "primary",
  onClick,
  className,
  left,
  disabled = false,
  children,
}: Props) => {
  const bg = {
    primary:
      "hover:bg-button-hover hover:bg-none bg-gradient-to-b from-white dark:from-[#2E2E32] to-[#F8F9FA] dark:to-[#28282C] text-base-light dark:text-base-dark border-neutral-button-light dark:border-neutral-button-dark",
    inverted:
      "hover:bg-button-inverted-hover hover:bg-none bg-gradient-to-b from-[#26292B] dark:from-white to-[#151718] dark:to-[#F4F2F4] text-base-dark dark:text-base-light",
  }[variant];

  return (
    <button
      onClick={onClick}
      className={clsx(
        bg,
        "flex flex-row items-center gap-1 p-2 text-labels-regular font-medium h-fit py-[9px] rounded-[7px] border",
        className,
        left ? "justify-start" : "justify-center"
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
