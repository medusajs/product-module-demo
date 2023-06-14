"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { memo, useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const GoogleAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID) return;
    gtag("config", GA_ID, {
      send_page_view: false,
    });
    gtag("event", "page_view", {
      page_path: window.location.pathname,
      send_to: GA_ID,
    });
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!GA_ID) return;

      gtag("event", "page_view", {
        page_path: url,
        send_to: GA_ID,
      });
    };
    handleRouteChange(pathname);
  }, [pathname, searchParams]);

  if (!GA_ID) {
    return null;
  }

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
        }}
      />
    </>
  );
};

export default memo(GoogleAnalytics);
