"use client";

import { Feature } from "@/components";
import { ControlPanel } from "@/components/control-panel";
import { useEffect, useRef, useState } from "react";
import { Country, PersonalizationData } from "@/types";
import { Hero } from "@/components/common/hero";

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
  ): Promise<PersonalizationData> {
    const options = countryCode
      ? { headers: { "x-simulated-country": countryCode } }
      : {};
    setIsLoading(true);
    const start = performance.now();
    const data = await fetch("/api/products", options).then((res) =>
      res.json()
    );
    const end = performance.now();
    setData(data);
    setLoadingTime(Math.floor(end - start));
    setIsLoading(false);
    countryCode && scrollToFeatures();
    return data;
  }

  useEffect(() => {
    getPersonalizationData();
  }, []);

  const setCountry = (country: Country | null) => {
    getPersonalizationData(country?.code);
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

  const personalizedSectionDescription = `We have registered that you are browsing from ${`${data?.personalized_section.continent_text.article} <span class="text-base-light dark:text-base-dark">${data?.personalized_section.continent_text.name}`}</span> country, <span class="text-base-light dark:text-base-dark">therefore we show ${
    data?.personalized_section.continent_text.name
  } products.</span>`;

  const allProductsSectionDescription = data?.all_products_section.category_name
    ? `Because the last product you visited was from the <span class="text-base-light dark:text-base-dark">${data?.all_products_section.category_name}</span> category, <span class="text-base-light dark:text-base-dark">we're showing products from that category first.</span>`
    : `Start browsing some products and we'll personalize this section for you!`;

  return (
    <div className="flex flex-col gap-y-16">
      <Feature
        products={data?.personalized_section.products!}
        max={3}
        title={`Products for visitors from ${
          isLoading ? "..." : data?.personalized_section.country
        }`}
        description={isLoading ? "..." : personalizedSectionDescription}
      />
      <Feature
        products={data?.all_products_section.products!}
        title="All products"
        description={isLoading ? "..." : allProductsSectionDescription}
        max={18}
      />
    </div>
  );
}
