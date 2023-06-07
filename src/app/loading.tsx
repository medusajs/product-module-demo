import {Feature} from "@/components";
import clsx from "clsx";

export default function Loading() {

    return ( <div style={{border: "2px solid"}} className="flex flex-col gap-y-16">
        {/*<Feature products={data?.personalized_section.products!} max={3}>*/}
            <div className="flex items-center justify-between">
                <h3 className="font-medium text-headers-h3">
                    This is server rendered HTML placeholder that arrived on the very first load before any JS.
                    <span className="blur">
            </span>
                </h3>
            </div>
            <p>
                Next screen that you will see will be product list rendered as server component.
            </p>
        {/*</Feature>*/}
        {/*<Feature products={data?.all_products_section.products!} max={18}>*/}
        {/*    <div className="flex items-center justify-between">*/}
        {/*        <h3 className="font-medium text-headers-h3">All products</h3>*/}
        {/*    </div>*/}
        {/*    <p className={clsx(isLoading && "blur", "text-subtle-dark")}>*/}
        {/*        {data?.all_products_section.category_name ? (*/}
        {/*            <>*/}
        {/*                Because the last product you visited was from the{" "}*/}
        {/*                <span className="text-base-light dark:text-base-dark">*/}
        {/*        {data?.all_products_section.category_name}*/}
        {/*      </span>{" "}*/}
        {/*                category,{" "}*/}
        {/*                <span className="text-base-light dark:text-base-dark">*/}
        {/*        we&apos;re showing products from that category first.*/}
        {/*      </span>*/}
        {/*            </>*/}
        {/*        ) : (*/}
        {/*            <>*/}
        {/*                Start browsing some products and we&apos;ll personalize this*/}
        {/*                section for you!*/}
        {/*            </>*/}
        {/*        )}*/}
        {/*    </p>*/}
        {/*</Feature>*/}
    </div>
)
}
