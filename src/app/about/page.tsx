import { Modal } from "@/components";
import { Nextjs, Medusa } from "@/components/icons";

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
          <div className="w-full flex flex-row flex-wrap gap-y-6 md:flex-nowrap gap-x-16 items-center mb-16">
            <div className="flex flex-wrap justify-center items-center gap-x-1 gap-y-2 text-subtle-light dark:text-subtle-dark max-w-[399px] text-center">
              Medusa Product Module demo in
              <span className="flex flex-row items-center gap-1">
                <Nextjs />
                Next.js
              </span>
              functions
            </div>
          </div>
          <div className="md:w-2/3 w-full"></div>
          <div className="md:w-1/3 w-full"></div>
        </div>
      </div>
    </Modal>
  );
}
