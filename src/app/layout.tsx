import { ReactNode } from "react";
import { Footer } from "@/components";
import { Nav } from "@/components/layout/nav";
import clsx from "clsx";
import { NotificationProvider } from "@/components/common/notification";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/common/google-analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | Medusa Product Module Demo",
    default: "Medusa Product Module Demo",
  },
  description:
    "Learn how to use the Medusa Product Module in a Next.js function to personalize your storefront. Discover the benefits of running the Product Module in a serverless environment and get started building today.",
  openGraph: {
    title: "Medusa Product Module Demo",
    siteName: "Medusa Product Module Demo",
    description:
      "Learn how to use the Medusa Product Module in a Next.js function to personalize your storefront. Discover the benefits of running the Product Module in a serverless environment and get started building today.",
    type: "website",
    author: "MedusaJS",
    images: "/product-module-demo-thumbnail.jpg",
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <body
        className={clsx(
          inter.className,
          "bg-subtle-light dark:bg-subtle-dark text-base-light dark:text-base-dark min-h-screen"
        )}
      >
        <GoogleAnalytics />
        <NotificationProvider>
          {/* @ts-ignore server component */}
          <Nav />
          <main className="py-16 px-4 sm:px-8 xl:px-0">{children}</main>
          {modal}
          <Footer />
        </NotificationProvider>
      </body>
    </html>
  );
}
