import { Feature } from "@/components";
import { ControlPanel } from "@/components/control-panel";
import { PersonalizationData } from "@/types";
import { Hero } from "@/components/common/hero";
import { cookies, headers } from "next/headers";
import { HighlightTweet } from "@/components/common/highlight-tweet";

type Props = {
  data: PersonalizationData | null;
};

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${process.env.VERCEL_URL}`;

export default async function Home({
  searchParams: { cc },
}: {
  searchParams: { cc: string | null };
}) {
  const headerList = headers();
  const cookieList = cookies();

  const userId = cookieList.get("userId")?.value!;
  const vercelIPCountry = headerList.get("x-vercel-ip-country")!;
  const options = {
    headers: { "x-country": cc ?? vercelIPCountry ?? "US", "x-userId": userId },
  };

  const start = performance.now();

  const data = await (await fetch(`${baseURL}/api/products`, options)).json();

  // TODO: add fallback UI if error in the API call

  const end = performance.now();
  const loadingTime = Math.floor(end - start);

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-7xl flex">
        <div className="w-full flex flex-col gap-y-16 relative">
          <Hero />
          <Features data={data} />
          <HighlightTweet id={process.env.NEXT_PUBLIC_TWEET_ID} />
          <ControlPanel data={data} loadingTime={loadingTime} />
        </div>
      </div>
    </main>
  );
}

function Features({ data }: Props) {
  return (
    <div className="flex flex-col gap-y-16">
      <Feature products={data?.personalized_section.products!} max={3}>
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-headers-h3">
            Products for visitors from{" "}
            <span>{data?.personalized_section.country}</span>
          </h3>
        </div>
        <p className="text-subtle-dark">
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
        <p className="text-subtle-dark">
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
