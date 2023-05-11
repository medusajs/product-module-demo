import { Tag } from "@/components/common";
import clsx from "clsx";

// Create a type Props that accepts the same props as a <a> element
type Props = React.ComponentProps<"a"> & {
  tag?: string;
};

const FooterLink = ({ tag, className, children, ...rest }: Props) => {
  return (
    <a
      target="_blank"
      rel="noopener norefferer"
      className={clsx(
        "text-labels-regular text-subtle-light dark:text-subtle-dark hover:text-base-light dark:hover:text-base-dark transition-colors",
        className
      )}
      {...rest}
    >
      <span className="flex items-center gap-x-2">
        {children}
        {tag && (
          <Tag variant="blue" size="small">
            {tag}
          </Tag>
        )}
      </span>
    </a>
  );
};

export default FooterLink;
