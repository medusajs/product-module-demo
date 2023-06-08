import {Hero} from "@/components/common/hero";
import {Feature} from "@/components";

const data = {
    personalized_section: {products:[{handle: "", thumbnail: "", title: "", variants: []}, {handle: "", thumbnail: "", title: "", variants: []},{handle: "", thumbnail: "", title: "", variants: []}], country: "United States", continent_text: {name: "North America", article: "a North American"}},
    all_products_section: {products: [
            {handle: "", thumbnail: "", title: "", variants: []},
            {handle: "", thumbnail: "", title: "", variants: []},
            {handle: "", thumbnail: "", title: "", variants: []}
        ], category_name: ""}

}

export default function Loading() {
    return (
        <main className="flex flex-col items-center">
            <div className="w-full max-w-7xl flex">
                <div className="w-full flex flex-col gap-y-16 relative">
                    <Hero/>

                    <div className="flex flex-col gap-y-16">
                        <Feature products={data?.personalized_section.products!} max={3}>
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium text-headers-h3">
                                    Products for visitors from{" "}
                                    <span className="blur">
                                      {data?.personalized_section.country}
                                    </span>
                                </h3>
                            </div>
                            <p className="text-subtle-dark">
                                We have registered that you are browsing from{" "}
                                <span className="text-base-light dark:text-base-dark blur">
            {data?.personalized_section.continent_text.article}{" "}
                                    {data?.personalized_section.continent_text.name}
          </span>{" "}
                                country,{" "}
                                <span className="text-base-light dark:text-base-dark blur">
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
                </div>
            </div>
        </main>
    )
}
