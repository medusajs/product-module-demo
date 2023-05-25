"use client";

import { Feature, Image } from "@/components";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
// import { cookies } from "next/headers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type PersonalizationData = {
  personalized_section: {
    country: string;
    continent_text: {
      name: string;
      article: string;
    };
    products: PricedProduct[];
  };
  all_products_section: {
    category_name: string;
    products: PricedProduct[];
  };
};

type Props = {
  data: PersonalizationData | null;
  isLoading: boolean;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<PersonalizationData | null>(null);

  useEffect(() => {
    async function getPersonalizationData(): Promise<PersonalizationData> {
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/api/products", {
        // headers: {
        //   "x-user-id": cookies().get("userId")?.value ?? "",
        // },
      });
      const data = await res.json();
      setData(data);
      setIsLoading(false);
      return data;
    }
    getPersonalizationData();
  }, []);

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-7xl flex">
        <div className="w-full flex flex-col gap-y-16">
          <img className="h-30 w-full" src="/hero.svg" alt="" />
          <Features data={data} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}

export function Features({ data, isLoading }: Props) {
  if (isLoading) return <>Loading data</>;
  if (!data) return <>No data</>;

  const { personalized_section, all_products_section } = data;

  return (
    <div className="flex flex-col gap-y-16">
      <Feature
        products={personalized_section.products}
        max={3}
        title={`Products for visitors from ${personalized_section.country}`}
        description={`We have registered that you are browsing from ${personalized_section.continent_text.article} ${personalized_section.continent_text.name} country, therefore we show ${personalized_section.continent_text.name} products.`}
      />
      <Feature
        products={all_products_section.products}
        title="All products"
        description={`Because the last product you visited was from the ${all_products_section.category_name} category, we're showing products from that category first.`}
        max={12}
      />
    </div>
  );
}
