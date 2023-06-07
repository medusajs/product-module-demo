"use client";

import { Feature } from "@/components";
import { ControlPanel } from "@/components/control-panel";
import { useEffect, useRef, useState } from "react";
import { Country, PersonalizationData } from "@/types";
import { Hero } from "@/components/common/hero";
import clsx from "clsx";
import {GetServerSideProps, InferGetServerSidePropsType } from "next";

type Props = {
  data: PersonalizationData | null;
  isLoading: boolean;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<PersonalizationData | null>(null);
  const [loadingTime, setLoadingTime] = useState(0);
  const featuresRef = useRef<HTMLDivElement>(null);

  async function getPersonalizationData(
    countryCode?: string
  ): Promise<void> {
    const options = countryCode
      ? { headers: { "x-simulated-country": countryCode } }
      : {};

    setIsLoading(true);

    const start = performance.now();
    let end: number = 0;

    const data = await fetch("/api/products", options)
    .then((res) => {
      end = performance.now();
      return res;
    }).then((res) => res.json());

    setData(data);
    setLoadingTime(Math.floor(end - start));
    setIsLoading(false);
    countryCode && scrollToFeatures();
  }

  useEffect( () => {
    getPersonalizationData();
  }, [])

  const setCountry = async (country: Country | null) => {
    await getPersonalizationData(country?.code);
  };

  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-7xl flex">
        <div className="w-full flex flex-col gap-y-16 relative">
          <Hero />
          <div ref={featuresRef}>
            <Features data={data} isLoading={isLoading} />
          </div>
          <ControlPanel
            data={data}
            loadingTime={loadingTime}
            setCountry={setCountry}
            scrollToFeatures={scrollToFeatures}
          />
        </div>
      </div>
    </main>
  );
}

function Features({ data, isLoading }: Props) {
  if (!isLoading && !data) return <>No data</>;

  return (
    <div className="flex flex-col gap-y-16">
      <Feature products={data?.personalized_section.products!} max={3}>
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-headers-h3">
            Products for visitors from{" "}
            <span className={clsx(isLoading && "blur")}>
              {isLoading ? "United States" : data?.personalized_section.country}
            </span>
          </h3>
        </div>
        <p className={clsx(isLoading && "blur", "text-subtle-dark")}>
          We have registered that you are browsing from{" "}
          <span className="text-base-light dark:text-base-dark">
            {data?.personalized_section.continent_text.article}{" "}
            {data?.personalized_section.continent_text.name}
          </span>{" "}
          country,{" "}
          <span className="text-base-light dark:text-base-dark">
            therefore we show {data?.personalized_section.continent_text.name}{" "}
            products.
          </span>
        </p>
      </Feature>
      <Feature products={data?.all_products_section.products!} max={18}>
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-headers-h3">All products</h3>
        </div>
        <p className={clsx(isLoading && "blur", "text-subtle-dark")}>
          {data?.all_products_section.category_name ? (
            <>
              Because the last product you visited was from the{" "}
              <span className="text-base-light dark:text-base-dark">
                {data?.all_products_section.category_name}
              </span>{" "}
              category,{" "}
              <span className="text-base-light dark:text-base-dark">
                we&apos;re showing products from that category first.
              </span>
            </>
          ) : (
            <>
              Start browsing some products and we&apos;ll personalize this
              section for you!
            </>
          )}
        </p>
      </Feature>
    </div>
  );
}
