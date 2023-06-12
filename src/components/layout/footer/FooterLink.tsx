import { Tag } from "@/components/common";
import clsx from "clsx";

// Create a type Props that accepts the same props as a <a> element
type Props = React.ComponentProps<"a"> & {
  tag?: string;
};

const FooterLink = ({ tag, className, children, href, ...rest }: Props) => {
  return (
    <a
      target="_blank"
      rel="noopener norefferer"
      href={href + "?utm_source=product-module-demo&utm_medium=recap&utm_campaign=footer"}
      className={clsx(
        "text-labels-regular text-base-light dark:text-base-dark hover:text-subtl-light dark:hover:text-subtle-dark transition-colors",
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
