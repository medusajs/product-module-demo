import { Modal } from "@/components";
import CodeSnippets from "@/components/common/code-snippet/CodeSnippets";
import CustomListItem from "@/components/common/custom-list-item/CustomListItem";
import { Nextjs } from "@/components/icons";
import NextImage from "next/image";

export default async function AboutModal() {
  return (
    <Modal>
      <div className="w-full px-4">
        <div className="relative h-96 w-full overflow-hidden bg-[url('/hero.svg')] bg-cover bg-base-light dark:bg-base-dark rounded-2xl">
          <div className="absolute inset-0 flex flex-col gap-6 items-center justify-center">
            <div className="flex flex-col gap-2 items-center justify-center text-center">
              <div className="text-base-light dark:text-base-dark text-4xl">
                Product Module Demo.
              </div>
              <div className="text-subtle-light dark:text-subtle-dark text-4xl">
                Powered by Medusa.
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col flex-wrap gap-y-6 pb-20 md:flex-nowrap px-8 lg:px-48 mt-12">
          <div className="flex flex-row rounded-[999px] dark:shadow-card-rest-dark px-4 py-1 text-labels-small gap-3 w-fit">
            <span>Building blocks</span>
            <a
              className="border-solid border-l border-neutral-button-light dark:border-neutral-button-dark pl-3 text-subtle-light dark:text-subtle-dark"
              href="https://medusajs.com/"
            >
              <span className="hover:text-base-dark">Read more</span>
            </a>
          </div>

          <h4 className="flex flex-wrap gap-x-1 gap-y-2 text-headers-h4 text-base-light dark:text-base-dark">
            Medusa Product Module demo in
            <span className="flex flex-row items-center gap-1">
              <Nextjs fill="#FFFFFF" />
              Next.js
            </span>
            functions
          </h4>
          <p className="text-subtle-light dark:text-subtle-dark text-body-regular">
            This demo showcases our Product Module running in a serverless
            Next.js function. In the demo, we're using the Product Module to
            personalize the storefront in real time based on the user location
            and behavior.
          </p>
          <h4 className="text-headers-h4 text-base-light dark:text-base-dark">
            What are Medusa Modules?
          </h4>
          <p className="text-subtle-light dark:text-subtle-dark text-body-regular">
            Modules are packages with self-contained commerce logic, promoting
            separation of concerns, maintainability, and reusability. Modules
            increase Medusa's extensibility, allowing for customization of core
            commerce logic and composition with other tools. This flexibility
            allows for greater choice in the tech stack used in conjunction with
            Medusa.
          </p>
          <h4 className="text-headers-h4 text-base-light dark:text-base-dark">
            Why run it from a Next.js function?
          </h4>
          <p className="text-subtle-light dark:text-subtle-dark text-body-regular">
            Running Medusa's Product Module in a serverless function provides
            several benefits over hosting a conventional backend:
            <ul className="list-disc ml-8 py-4">
              <li>
                It offers fast response times, making it suitable for use cases
                like realtime personalization.
              </li>
              <li>
                The Next.js function scales automatically to meet demand,
                meaning there is no need to worry about provisioning and
                managing servers.
              </li>
              <li>
                The Next.js function is only invoked when needed, reducing the
                overall cost of running the module.
              </li>
            </ul>
            Our future work will focus on publishing all core Medusa domains as
            modules and making them compatible with edge runtimes.
          </p>
          <h4 className="text-headers-h4 text-base-light dark:text-base-dark">
            How does the demo work?
          </h4>
          <p className="text-subtle-light dark:text-subtle-dark text-body-regular">
            The demo storefront personalizes the products shown based on user
            location and last viewed products.
            <br className="block mb-2 content-['']" />
            The top part is based on your (simulated) country. It looks up the
            country's continent and shows all products tagged with that
            continent. So if you're visiting from France, you'll see European
            content, and so on.
            <br className="block mb-2 content-['']" />
            The '<em>All products</em>' part will be sorted based on your last
            viewed product. It uses the product's category and shows all
            products from that category first. So if you're last viewed product
            was from the <em>hoodies</em> category, it will show all hoodies on
            top.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-[#2E2E32] to-transparent my-12"></div>

          <ul className="list-none w-full">
            <CustomListItem title="Product Module">
              <span className="text-base-dark text-labels-regular">
                Initialize the Product Module.
              </span>
              <p>Simply initialize the module in the Next.js API route.</p>
              <CodeSnippets
                label="/api/products/route.ts"
                language="javascript"
                code={`import { initialize as ProductModuleInitialize } from "@medusajs/product";\r\n\r\nconst productService = await ProductModuleInitialize();\r\n\r\n// list all products\r\nconst products = await productService.list({});`}
              />
              <p>All products are now displayed in standard order.</p>
              <NextImage
                className="rounded-xl overflow-hidden my-4 shadow-card-rest-dark"
                src="/all-initial.png"
                alt="All products - initial state"
                width={1307}
                height={934}
              />
            </CustomListItem>
            <CustomListItem title="User location">
              <span className="text-base-dark text-labels-regular">
                Get the user's location from the request header.
              </span>
              <p>
                We use the Vercel country header by default, or overwrite it
                with a simulated location when provided.
              </p>
              <CodeSnippets
                label="/api/products/route.ts"
                language="javascript"
                code={`\/\/ Get the user\'s country code from the Vercel header, or overwrite with \r\n\/\/ a simulated location when provided.\r\nconst countryCode = \r\n\treq.headers.get(\"x-simulated-country\") ?? \r\n\treq.headers.get(\"x-vercel-ip-country\")\r\n\r\n\/\/ Get the user\'s continent from a mapper.\r\nlet continent = getContinent[countryCode]\r\n\r\n\/\/ List 3 products with a tag that matches the user\'s continent.\r\nconst localProducts = await productService.list(\r\n  { tags: { value: [continent] } },\r\n  { take: 3 }\r\n);`}
              />
              <p>Display the localized products.</p>
              <NextImage
                className="rounded-xl overflow-hidden my-4 shadow-card-rest-dark"
                src="/local-initial.png"
                alt="Localised products - initial state"
                width={1304}
                height={487}
              />
              <p>
                You can simulate a different location using the control panel.
              </p>
              <NextImage
                className="rounded-xl overflow-hidden my-4 shadow-card-rest-dark"
                src="/simulate-location.png"
                alt="Simulate your location from the control panel."
                width={(776 / 3) * 2}
                height={(331 / 3) * 2}
              />
            </CustomListItem>
            <CustomListItem title="Last viewed product">
              <span className="text-base-dark text-labels-regular">
                Store the user's last viewed category in a Vercel KV store.
              </span>
              <p>
                When a user clicks a product, we store the product's category
                data in a KV store.
              </p>
              <CodeSnippets
                label="/api/category-tracker/route.ts"
                language="javascript"
                code={`import { kv } from \"@vercel\/kv\";\r\n\r\n\/\/ Grab the category data from the request.\r\nconst { categoryId, categoryName } = await request.json()\r\n\r\nconst userData = {\r\n  categoryId,\r\n  categoryName,\r\n};\r\n\r\n\/\/ Grab the userId from the cookie and assign the category data to the \r\n\/\/ userId in the KV store.\r\nconst userId = request.cookies.get(\"userId\").value;\r\nawait kv.set(userId, userData);`}
              />
              <p>Click a product to view its product page.</p>
              <NextImage
                className="rounded-xl overflow-hidden my-4 shadow-card-rest-dark"
                src="/click-product.png"
                alt="Click a product to view its product page."
                width={(435 / 3) * 2}
                height={(375 / 3) * 2}
              />
            </CustomListItem>
            <CustomListItem title="Personalize products">
              <span className="text-base-dark text-labels-regular">
                Display all products with the last viewed category's products on
                top.
              </span>
              <p>
                We grab the user's last viewed category from the KV store and
                sort all products with that category on top.
              </p>
              <CodeSnippets
                label="/api/category-tracker/route.ts"
                language="javascript"
                code={`\/\/ Grab the userId from the request and look up the categoryId from the KV.\r\nconst userId = req.cookies.get(\"userId\").value;\r\nconst { categoryId } = await kv.get(userId);\r\n\r\n\/\/ Get all products.\r\nconst allProducts = await productService.list({});\r\n\r\n\/\/ Re-order the products based on the last viewed categoryId.\r\nconst orderedProducts = orderProductByCategoryIdFirst(allProducts, categoryId);`}
              />{" "}
              <p>Hoodies are now displayed on top!</p>
              <NextImage
                className="rounded-xl overflow-hidden my-4 shadow-card-rest-dark"
                src="/all-ordered.png"
                alt="Hoodies are now displayed on top"
                width={1309}
                height={938}
              />
            </CustomListItem>
          </ul>

          <div className="h-px bg-gradient-to-r from-transparent via-[#2E2E32] to-transparent my-12"></div>

          <h4 className="text-headers-h4 text-base-light dark:text-base-dark">
            Get started with the Product Module in Next.js
          </h4>
          <p className="text-subtle-light dark:text-subtle-dark text-body-regular">
            Ready to get started with the Medusa Product Module in your Next.js
            app? Visit our{" "}
            <a
              className="hover:text-subtle-light text-base-dark"
              href="https://docs.medusajs.com/"
            >
              documentation
            </a>{" "}
            to learn more and start building today!
          </p>
        </div>
      </div>
    </Modal>
  );
}
