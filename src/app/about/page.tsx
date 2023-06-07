import { Modal } from "@/components";
import CustomListItem from "@/components/common/custom-list-item/CustomListItem";
import { Nextjs } from "@/components/icons";

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

        <div className="w-full flex flex-col flex-wrap gap-y-6 md:flex-nowrap px-48 mt-12">
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

          <ul className="list-none">
            <CustomListItem title="Product Module">
              <span className="text-base-dark text-labels-regular">
                Initializing the Product Module:
              </span>
              <p>
                Modules are packages with self-contained commerce logic,
                promoting separation of concerns, maintainability, and
                reusability. Modules increase Medusa's extensibility, allowing
                for customization of core commerce logic and composition with
                other tools. This flexibility allows for greater choice in the
                tech stack used in conjunction with Medusa.
              </p>
            </CustomListItem>
            <CustomListItem title="User location">
              <span className="text-base-dark text-labels-regular">
                Getting the user's location:
              </span>
              <p>
                Modules are packages with self-contained commerce logic,
                promoting separation of concerns, maintainability, and
                reusability. Modules increase Medusa's extensibility, allowing
                for customization of core commerce logic and composition with
                other tools. This flexibility allows for greater choice in the
                tech stack used in conjunction with Medusa.
              </p>
            </CustomListItem>
            <CustomListItem title="Last viewed product">
              <span className="text-base-dark text-labels-regular">
                Storing the user's last viewed category in Vercel KV:
              </span>
              <p>
                Modules are packages with self-contained commerce logic,
                promoting separation of concerns, maintainability, and
                reusability. Modules increase Medusa's extensibility, allowing
                for customization of core commerce logic and composition with
                other tools. This flexibility allows for greater choice in the
                tech stack used in conjunction with Medusa.
              </p>
            </CustomListItem>
            <CustomListItem title="Personalize products">
              <span className="text-base-dark text-labels-regular">
                Displaying all products with the last viewed category's products
                on top:
              </span>
              <p>
                Modules are packages with self-contained commerce logic,
                promoting separation of concerns, maintainability, and
                reusability. Modules increase Medusa's extensibility, allowing
                for customization of core commerce logic and composition with
                other tools. This flexibility allows for greater choice in the
                tech stack used in conjunction with Medusa.
              </p>
            </CustomListItem>
          </ul>
        </div>

        <div className="md:w-2/3 w-full"></div>
        <div className="md:w-1/3 w-full"></div>
      </div>
    </Modal>
  );
}
