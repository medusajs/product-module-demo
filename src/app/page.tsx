import { Feature, Image } from "@/components";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { cookies } from "next/headers";

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

async function getPersonalizationData(): Promise<PersonalizationData> {
  const res = await fetch("http://localhost:3000/api/products", {
    headers: {
      "x-user-id": cookies().get("userId")?.value ?? "",
    },
  });
  const data = await res.json();
  return data;
}

export default async function Home() {
  const { personalized_section, all_products_section } =
    await getPersonalizationData();

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-7xl flex flex-col gap-y-16">
        <div className="w-full">
          <img className="h-30 w-full" src="/hero.svg" alt="" />
        </div>
        {/* @ts-ignore */}
        <Feature
          products={personalized_section.products}
          max={3}
          title={`Products for visitors from ${personalized_section.country}`}
          description={`We have registered that you are browsing from ${personalized_section.continent_text.article} ${personalized_section.continent_text.name} country, therefore we show ${personalized_section.continent_text.name} products.`}
        />
        {/* @ts-ignore */}
        <Feature
          products={all_products_section.products}
          title="All products"
          description={`Because the last product you visited was from the ${all_products_section.category_name} category, we're showing products from that category first.`}
          max={12}
        />
      </div>
    </main>
  );
}
