import clsx from "clsx";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  variant?: "primary" | "inverted";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}>;

const Button = ({
  variant = "primary",
  onClick,
  className,
  disabled = false,
  children,
}: Props) => {
  const bg = {
    primary:
      "bg-gradient-to-b from-white dark:from-[#2E2E32] to-[#F8F9FA] dark:to-[#28282C] text-base-light dark:text-base-dark border-neutral-button-light dark:border-neutral-button-dark",
    inverted:
      "bg-gradient-to-b from-[#26292B] dark:from-white to-[#151718] dark:to-[#F4F2F4] text-base-dark dark:text-base-light",
  }[variant];

  return (
    <button
      onClick={onClick}
      className={clsx(
        className,
        bg,
        "flex flex-row items-center justify-center gap-1 p-2 text-labels-regular font-medium h-fit py-[9px] rounded-[7px] border"
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
