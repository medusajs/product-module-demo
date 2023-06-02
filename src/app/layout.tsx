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
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.className,
          "bg-subtle-light dark:bg-subtle-dark text-base-light dark:text-base-dark min-h-screen"
        )}
      >
        {/* @ts-ignore server component */}
        <Nav />
        <NotificationProvider>
          <main className="py-16">{children}</main>
          {modal}
          <Footer />
        </NotificationProvider>
      </body>
    </html>
  );
}
