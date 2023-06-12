import { Button } from "../button";
import { Nextjs } from "@/components/icons/nextjs";
import { Medusa } from "@/components/icons/medusa";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative h-96 w-full overflow-hidden bg-[url('/hero.svg')] bg-cover bg-base-light dark:bg-base-dark shadow-card-hover-light dark:shadow-card-hover-dark rounded-2xl p-2">
      <div className="absolute inset-0 flex flex-col gap-6 items-center justify-center">
        <div className="flex flex-col gap-2 items-center justify-center text-center">
          <div className="text-base-light dark:text-base-dark text-3xl md:text-4xl">
            Product Module Demo.
          </div>
          <div className="text-subtle-light dark:text-subtle-dark text-3xl md:text-4xl">
            Powered by Medusa.
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-1 gap-y-2 text-subtle-light dark:text-subtle-dark max-w-[399px] text-center">
          This demo uses
          <span className="flex flex-row items-center gap-1">
            <Nextjs />
            Next.js
          </span>
          and
          <span className="flex flex-row items-center gap-1">
            <Medusa /> Medusa
          </span>
          product modules for personalization.
        </div>
        <Button variant="inverted" className="px-[11px] py-[5px]">
          <Link href="/about">Read How It Works</Link>
        </Button>
      </div>
    </div>
  );
};

export default Hero;
