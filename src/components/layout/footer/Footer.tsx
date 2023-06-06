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
import NewsletterSignup from "./NewsletterSignup";

const linkGroups: FooterLinkGroupProps[] = [
  {
    groupName: "Product",
    links: [
      {
        href: "https://www.medusajs.com",
        label: "Medusa for B2B",
      },
      {
        href: "https://www.medusajs.com",
        label: "Plugins",
        tag: "New",
      },
      {
        href: "https://www.medusajs.com",
        label: "Get started",
      },
      {
        href: "https://www.medusajs.com",
        label: "Careers",
        tag: "We're hiring",
      },
    ],
  },
  {
    groupName: "Developers",
    links: [
      {
        href: "https://docs.medusajs.com",
        label: "Docs",
      },
      {
        href: "https://docs.medusajs.com",
        label: "API references",
      },
      {
        href: "https://docs.medusajs.com",
        label: "Community",
      },
      {
        href: "https://docs.medusajs.com",
        label: "Discussions",
      },
    ],
  },
  {
    groupName: "Company",
    links: [
      {
        href: "https://www.medusajs.com",
        label: "Blog",
      },
      {
        href: "https://www.medusajs.com",
        label: "Pricing",
      },
      {
        href: "https://www.medusajs.com",
        label: "About",
      },
      {
        href: "https://www.medusajs.com",
        label: "Contact us",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="flex items-start justify-center">
      <div className="max-w-7xl w-full">
        <Divider />
        <div className="pt-24 pb-16 flex flex-col gap-y-16">
          <div className="max-w-content w-full mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8 flex-wrap">
            <div className="w-full md:w-auto flex-grow">
              <a
                href="https://www.medusajs.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PictorialLogo />
              </a>
            </div>
            <div className="flex w-full md:w-auto gap-10 md:gap-16 lg:gap-24 flex-wrap">
              <div className="flex flex-wrap gap-10 gap-x-14 md:gap-16 lg:gap-24">
                {linkGroups.map((group, i) => {
                  return <FooterLinkGroup key={i} {...group} />;
                })}
              </div>
              <NewsletterSignup />
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
