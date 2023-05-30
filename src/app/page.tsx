"use client";

import { Feature } from "@/components";
import { ControlPanel } from "@/components/control-panel";
import { useEffect, useState } from "react";
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
    return data;
  }

  useEffect(() => {
    getPersonalizationData();
  }, []);

  const setCountry = (country: Country | null) => {
    getPersonalizationData(country?.code);
  };

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-7xl flex">
        <div className="w-full flex flex-col gap-y-16 relative">
          <Hero />
          <Features data={data} isLoading={isLoading} />
          <ControlPanel
            data={data}
            loadingTime={loadingTime}
            setCountry={setCountry}
          />
        </div>
      </div>
    </main>
  );
}

function Features({ data, isLoading }: Props) {
  if (isLoading) return <>Loading data</>;
  if (!data) return <>No data</>;

  const { personalized_section, all_products_section } = data;

  const personalizedSectionDescription = `We have registered that you are browsing from ${personalized_section.continent_text.article} ${personalized_section.continent_text.name} country, therefore we show ${personalized_section.continent_text.name} products.`;
  const allProductsSectionDescription = all_products_section.category_name
    ? `Because the last product you visited was from the ${all_products_section.category_name} category, we're showing products from that category first.`
    : `Start browsing some products and we'll personalize this section for you!`;

  return (
    <div className="flex flex-col gap-y-16">
      <Feature
        products={personalized_section.products}
        max={3}
        title={`Products for visitors from ${personalized_section.country}`}
        description={personalizedSectionDescription}
      />
      <Feature
        products={all_products_section.products}
        title="All products"
        description={allProductsSectionDescription}
        max={18}
      />
    </div>
  );
}
