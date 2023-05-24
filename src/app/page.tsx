import { Feature, Image } from "@/components";
import { client } from "@/lib";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { cookies } from "next/headers";

type PersonalizationData = {
  personalized_section: {
    country: string;
    continent: string;
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
  console.log({ data });
  return data;
}

export default async function Home() {
  const { personalized_section, all_products_section } =
    await getPersonalizationData();
  console.log("render home!");
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
          description={`We have registered that you are browsing from a ${personalized_section.continent} country, therefore we show ${personalized_section.continent} products.`}
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
