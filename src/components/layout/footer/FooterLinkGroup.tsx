import FooterLink from "./FooterLink";

type Link = {
  href: string;
  label: string;
  tag?: string;
};

export type FooterLinkGroupProps = {
  groupName: string;
  link?: Link;
  links: Link[];
};

const FooterLinkGroup = ({ groupName, link, links }: FooterLinkGroupProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <h5 className="text-labels-regular font-medium">
        {!link ? (
          groupName
        ) : (
          <FooterLink href={link!.href} tag={link!.tag} title={link!.label}>
            {link!.label}
          </FooterLink>
        )}

      </h5>
      <ul className="flex flex-col gap-y-4">
        {links.map((link, i) => {
          return (
            <li key={i}>
              <FooterLink href={link.href} tag={link.tag}>
                {link.label}
              </FooterLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FooterLinkGroup;
