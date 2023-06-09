import { ReactNode } from "react";
import { Footer } from "@/components";
import { Nav } from "@/components/layout/nav";
import clsx from "clsx";
import { NotificationProvider } from "@/components/common/notification";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Products Module Store",
  description: "Medusa's products module in a nextjs function",
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
