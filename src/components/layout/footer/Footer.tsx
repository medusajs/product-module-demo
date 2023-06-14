import {
  Discord,
  Divider,
  Github,
  Linkedin,
  PictorialLogo,
  Twitter,
} from "@/components";
import FooterLink from "./FooterLink";
import FooterLinkGroup, { FooterLinkGroupProps } from "./FooterLinkGroup";

const linkGroups: FooterLinkGroupProps[] = [
  {
    groupName: "Get started",
    link: {
      href: "https://www.medusajs.com",
      label: "Get started",
    },
    links: [],
  },
  {
    groupName: "Documentation",
    link: {
      href: "https://docs.medusajs.com",
      label: "Documentation",
    },
    links: [],
  },
  {
    groupName: "Blog",
    link: {
      href: "https://www.medusajs.com/blog",
      label: "Blog",
    },
    links: [],
  },
  {
    groupName: "README",
    link: {
      href: "https://medusajs.com/readme/",
      label: "Readme",
    },
    links: [],
  },
  {
    groupName: "Demo Source Code",
    link: {
      href: "https://github.com/medusajs/products-module-store",
      label: "Demo Source Code",
    },
    links: [],
  },
];

const Footer = () => {
  return (
    <footer className="flex items-start justify-center pb-[40px] lg:pb-0">
      <div className="max-w-7xl w-full">
        <Divider />
        <div className="pt-24 pb-16 flex flex-col gap-y-16">
          <div className="max-w-content w-full mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8 flex-wrap">
            <div className="w-full md:w-auto grow-[0.5]">
              <a
                href="https://www.medusajs.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PictorialLogo />
              </a>
            </div>
            <div className="flex grow-[0.2] w-full md:w-auto gap-10 md:gap-16 lg:gap-24 flex-wrap">
              <div className="flex flex-wrap gap-10 gap-x-14 md:gap-16 lg:gap-24 w-full justify-between">
                {linkGroups.map((group, i) => {
                  return <FooterLinkGroup key={i} {...group} />;
                })}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-labels-regular px-4 md:px-8">
            <span className="text-muted-light dark:text-muted-dark">
              © 2023 MedusaJS, Inc. All rights reserved.
            </span>
            <div className="flex items-center gap-x-4 text-icon-muted-light dark:text-icon-muted-dark">
              <FooterLink href="https://www.discord.gg/medusajs">
                <Discord />
              </FooterLink>
              <FooterLink href="https://www.twitter.com/medusajs">
                <Twitter />
              </FooterLink>
              <FooterLink href="https://www.linkedin.com/company/medusajs">
                <Linkedin />
              </FooterLink>
              <FooterLink href="https://www.github.com/medusajs">
                <Github />
              </FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
