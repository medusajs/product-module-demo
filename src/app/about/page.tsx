import { Modal } from "@/components";
import {
  CodeSnippet,
  CustomListItem,
  EnlargableImage,
} from "@/components/common";
import { Github, Nextjs, Sparkles } from "@/components/icons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutModal() {
  return (
    <Modal
      cta="Start Building"
      icon={<Sparkles />}
      href="https://docs.medusajs.com/?utm_source=product-module-demo&utm_medium=recap&utm_campaign=about-page&utm_content=cta"
    >
      <div className="w-full">
        <div className="flex w-full h-[30rem] bg-center bg-cover bg-no-repeat flex-start justify-center py-[4rem] my-[-6rem] bg-[url('/hero.svg')] bg-base-light dark:bg-base-dark rounded-2xl">
          <div className="inset-0 flex flex-col gap-6 items-center justify-center">
            <div className="flex flex-col gap-2 items-center justify-center text-center text-headers-h3 md:text-4xl">
              <div className="text-base-light dark:text-base-dark">
                Products Module Demo
              </div>
              <div className="text-subtle-light dark:text-subtle-dark">
                Powered by Medusa
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col flex-wrap gap-y-6 pb-20 md:flex-nowrap px-4 lg:px-52 mt-4">
          <a
            href="https://medusajs.com/?utm_source=product-module-demo&utm_medium=recap&utm_campaign=about-page&utm_content=pill"
            className="hover:shadow-card-hover-dark flex flex-row rounded-[999px] shadow-card-rest-dark px-4 py-1 text-labels-small gap-3 w-fit z-10"
          >
            <span>SDK for Commerce</span>
            <span className="border-solid border-l border-neutral-button-light dark:border-neutral-button-dark pl-3 text-subtle-light dark:text-subtle-dark">
              Read more
            </span>
          </a>

          <h4 className="flex flex-wrap gap-x-1 gap-y-2 text-headers-h4 text-base-light dark:text-base-dark">
            Medusa Products Module demo in
            <span className="flex flex-row items-center gap-1">
              <Nextjs fill="#FFFFFF" />
              Next.js
            </span>
            functions
          </h4>
          <p className="text-subtle-light dark:text-subtle-dark text-body-regular">
            This demo showcases our Products Module running in a serverless
            Next.js function. In the demo, we&apos;re using the Products Module
            to personalize the storefront in real time based on the user
            location and behavior.
          </p>
          <h4 className="text-headers-h4 text-base-light dark:text-base-dark">
            What are Medusa Modules?
          </h4>
          <p className="text-subtle-light dark:text-subtle-dark text-body-regular">
            Modules are packages with self-contained commerce logic, promoting
            separation of concerns, maintainability, and reusability. Modules
            increase Medusa&apos;s extensibility, allowing for customization of
            core commerce logic and composition with other tools. This
            flexibility allows for greater choice in the tech stack used in
            conjunction with Medusa.
          </p>
          <h4 className="text-headers-h4 text-base-light dark:text-base-dark">
            Why run it from a Next.js function?
          </h4>
          <p className="text-subtle-light dark:text-subtle-dark text-body-regular">
            Running Medusa&apos;s Products Module in a serverless function
            provides several benefits over hosting a conventional backend:
          </p>
          <ul className="list-disc ml-8 text-subtle-light dark:text-subtle-dark text-body-regular">
            <li>
              It offers fast response times, making it suitable for use cases
              like realtime personalization.
            </li>
            <li>
              The Next.js function scales automatically to meet demand, meaning
              there is no need to worry about provisioning and managing servers.
            </li>
            <li>
              The Next.js function is only invoked when needed, reducing the
              overall cost of running the module.
            </li>
          </ul>
          <p className="text-subtle-light dark:text-subtle-dark text-body-regular">
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
            country&apos;s continent and shows all products tagged with that
            continent. So if you&apos;re visiting from France, you&apos;ll see
            European content, and so on.
            <br className="block mb-2 content-['']" />
            The <em>All products</em> part will be sorted based on your last
            viewed product. It uses the product&apos;s category and shows all
            products from that category first. So if your last viewed product
            was from the <em>tote bags</em> category, it will show all tote bags
            on top.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-[#2E2E32] to-transparent my-6 md:my-10"></div>

          <h4 className="text-headers-h4 text-base-light dark:text-base-dark">
            How we implemented personalization
          </h4>

          <div className="flex flex-inline gap-6 items-center rounded-md p-6 bg-overlay-dark border border-base-dark text-labels-regular text-subtle-dark">
            <Github className="min-w-[20px]" />
            <span>
              The code snippets below are simplified for readability. You can
              check out the full source code on{" "}
              <a
                className="hover:text-subtle-light text-base-dark"
                href="https://github.com/medusajs/products-module-store"
              >
                GitHub
              </a>
              .
            </span>
          </div>

          <ul className="list-none w-full">
            <CustomListItem title="Products Module">
              <span className="text-base-dark text-labels-regular">
                Initialize the Products Module.
              </span>
              <p>Simply initialize the module in the Next.js API route.</p>
              <CodeSnippet
                label="/api/products/route.ts"
                language="javascript"
                code={`import { initialize as initializeProductModule } from \"@medusajs\/product\";\r\n\r\nexport async function GET(req) {\r\n  const productService = await initializeProductModule();\r\n\r\n  \/\/ list all products\r\n  const products = await productService.list({});\r\n  \r\n  return NextResponse.json({ products });\r\n}`}
              />
              <p>All products are now displayed in standard order.</p>
              <EnlargableImage
                src="/all-initial.png"
                alt="All products - initial state"
                width={1307}
                height={934}
                sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
              />
            </CustomListItem>
            <CustomListItem title="User location">
              <span className="text-base-dark text-labels-regular">
                Get the user&apos;s location from the request header.
              </span>
              <p>
                We use the Vercel country header by default, or overwrite it
                with a simulated location when provided.
              </p>
              <CodeSnippet
                label="/api/products/route.ts"
                language="javascript"
                code={`import { initialize as initializeProductModule } from \"@medusajs\/product\";\r\n\r\nexport async function GET(req) {\r\n\tconst productService = await initializeProductModule();\r\n\r\n\t\/\/ Get the user\'s (simulated) country code from the header. \r\n\tconst countryCode = req.headers.get(\"x-country\"); \r\n\t\r\n\t\/\/ Get the user\'s continent from a mapper.\r\n\tconst { name: country, continent } = isoAlpha2Countries[countryCode];\r\n\t\r\n\t\/\/ List 3 products with a tag that matches the user\'s continent.\r\n\tconst personalizedProducts = await productService.list(\r\n\t  { tags: { value: [continent] } },\r\n\t  { take: 3 }\r\n\t);\r\n\r\n\treturn NextResponse.json({ personalizedProducts });\r\n}`}
              />
              <p>Display the localized products.</p>
              <EnlargableImage
                src="/local-initial.png"
                alt="Localised products - initial state"
                width={1304}
                height={487}
                sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
              />
              <p>
                You can simulate a different location using the control panel.
              </p>
              <EnlargableImage
                src="/simulate-location.png"
                alt="Simulate your location from the control panel."
                width={(776 / 3) * 2}
                height={(331 / 3) * 2}
                sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
              />
            </CustomListItem>
            <CustomListItem title="Last viewed product">
              <span className="text-base-dark text-labels-regular">
                Store the user&apos;s last viewed category in a Vercel KV store.
              </span>
              <p>
                When a user clicks a product, we store the product&apos;s
                category data in a KV store.
              </p>
              <CodeSnippet
                label="/api/category-tracker/route.ts"
                language="javascript"
                code={`import { kv } from \"@vercel\/kv\";\r\n\r\nexport async function POST(req) {\r\n\t\/\/ Grab the category data from the request.\r\n\tconst { categoryId, categoryName } = await req.json();\r\n\t\r\n\tconst userData = {\r\n\t  categoryId,\r\n\t  categoryName,\r\n\t};\r\n\t\r\n\t\/\/ Grab the userId from the cookie and assign the category data to the userId \r\n\t\/\/ in the KV store.\r\n\tconst userId = req.cookies.get(\"userId\").value;\r\n\tawait kv.set(userId, userData);\r\n\r\n\treturn new NextResponse();\r\n}`}
              />
              <p>Click a product to view its product page.</p>
              <EnlargableImage
                src="/click-product.png"
                alt="Click a product to view its product page."
                width={(435 / 3) * 2}
                height={(375 / 3) * 2}
                sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
              />
            </CustomListItem>
            <CustomListItem title="Personalize products">
              <span className="text-base-dark text-labels-regular">
                Display all products with the last viewed category&apos;s
                products on top.
              </span>
              <p>
                We grab the user&apos;s last viewed category from the KV store
                and sort all products with that category on top.
              </p>
              <CodeSnippet
                label="/api/products/route.ts"
                language="javascript"
                code={`import { initialize as initializeProductModule } from \"@medusajs\/product\";\r\nimport { kv } from \"@vercel\/kv\";\r\n\r\nexport async function GET(req) {\r\n\tconst productService = await initializeProductModule();\r\n\r\n\t\/\/ Grab the userId from the request and look up the categoryId from the KV.\r\n\tconst userId = req.cookies.get(\"userId\").value;\r\n\tconst { categoryId } = await kv.get(userId);\r\n\t\r\n\t\/\/ Get all products.\r\n\tconst allProducts = await productService.list({});\r\n\t\r\n\t\/\/ Re-order the products based on the last viewed categoryId.\r\n\tconst orderedProducts = orderProductByCategoryIdFirst(allProducts, categoryId);\r\n\r\n\treturn NextResponse.json({ orderedProducts });\r\n}`}
              />
              <p>Tote bags are now displayed on top!</p>
              <EnlargableImage
                src="/all-ordered.png"
                alt="Tote bags are now displayed on top"
                width={1309}
                height={938}
                sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
              />
            </CustomListItem>
          </ul>

          <div className="h-px bg-gradient-to-r from-transparent via-[#2E2E32] to-transparent my-6 md:my-10"></div>

          <h4 className="text-headers-h4 text-base-light dark:text-base-dark">
            Start building with the Products Module in Next.js
          </h4>
          <p className="text-subtle-light dark:text-subtle-dark text-body-regular">
            Ready to get started with the Medusa Products Module in your Next.js
            app? Visit our{" "}
            <a
              className="hover:text-subtle-light text-base-dark"
              href="https://docs.medusajs.com/?utm_source=product-module-demo&utm_medium=recap&utm_campaign=about-page&utm_content=paragraph"
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
