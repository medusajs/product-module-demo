import { Button } from "../button";
import { Nextjs } from "@/components/icons/nextjs";
import { Medusa } from "@/components/icons/medusa";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="h-fit w-full overflow-hidden bg-[url('/hero.svg')] bg-cover bg-center bg-base-light dark:bg-base-dark shadow-card-hover-light dark:shadow-card-hover-dark rounded-2xl p-4">
      <div className="inset-0 flex flex-col gap-6 items-center justify-center p-4">
        <div className="flex flex-col gap-4 items-center justify-center text-center">
          <div className="text-base-light dark:text-base-dark text-3xl md:text-4xl">
            Products Module Demo
          </div>
          <div className="flex flex-wrap flex-inline justify-center gap-x-1 gap-y-2 text-subtle-light dark:text-subtle-dark max-w-fit text-center">
            <span className="flex flex-row gap-1 flex-wrap justify-center">
              This demo uses
              <span className="flex flex-row items-center gap-1">
                <Nextjs />
                Next.js
              </span>
              and
              <span className="flex flex-row items-center gap-1">
                <Medusa /> Medusa
              </span>
              products module
            </span>
            for personalization.
          </div>
        </div>
        {/* Mobile */}
        <div className="flex flex-col gap-4 justify-between items-center md:hidden">
          <Image
            className="block md:hidden"
            src="/controls-image-mobile.svg"
            alt="Control panel explainer"
            width={290}
            height={160}
          />
          <ol className="list-decimal ml-4 text-subtle-dark text-labels-small space-y-1">
            <li>
              The time it takes for Vercel Function to respond with products
              using our Products Module.
            </li>
            <li>The region of Vercel Function.</li>
            <li>We store last viewed product category in Vercel KV.</li>
            <li>
              The country picker allows you to simulate your location around the
              world. We default to x-vercel-ip-country.
            </li>
          </ol>
        </div>
        {/* Tablet / Desktop */}
        <Image
          className="hidden md:block"
          src="/controls-image.svg"
          alt="Control panel explainer"
          width={1000}
          height={280}
        />
        <Link href="/about">
          <Button variant="inverted" className="px-[11px] py-[5px]">
            Read How It Works
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
