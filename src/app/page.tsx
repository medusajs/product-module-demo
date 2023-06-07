import { Feature } from "@/components";
import { ControlPanel } from "@/components/control-panel";
import { Country, PersonalizationData } from "@/types";
import { Hero } from "@/components/common/hero";
import clsx from "clsx";

type Props = {
  data: PersonalizationData | null;
  isLoading: boolean;
};

export default async function Home({searchParams: { cc }}) {
  const start = performance.now();

  const options = cc
      ? { headers: { "x-simulated-country": cc } }
      : {};

  const data = await (await fetch("http://localhost:3000/api/products", options)).json()

  const end = performance.now();
  const loadingTime = Math.floor(end - start)

  console.log("render", {data, cc})

  const setCountry = async (country: Country | null) => {
    // await getPersonalizationData(country?.code);
  };

  const scrollToFeatures = () => {
    // if (featuresRef.current) {
    //   featuresRef.current.scrollIntoView({ behavior: "smooth" });
    // }
  };

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-7xl flex">
        <div className="w-full flex flex-col gap-y-16 relative">
          <Hero />
          <Features data={data} isLoading={false} />
          <ControlPanel
            data={data}
            loadingTime={loadingTime}
            // setCountry={setCountry}
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
