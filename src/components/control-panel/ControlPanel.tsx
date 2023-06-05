"use client";

import { Country, PersonalizationData } from "@/types";
import { LastClick } from "../icons/lastclick";
import { ArrowRefresh } from "../icons/arrow-refresh";
import { Button } from "../common";
import CountryPicker from "./CountryPicker";
import { startTransition, useEffect, useRef, useState } from "react";
import HoverModal from "./HoverModal";
import { useRouter } from "next/navigation";

type Props = {
  data: PersonalizationData | null;
  selectedCountry?: string;
  loadingTime: number;
  setCountry: (country: Country | null) => Promise<void>;
  scrollToFeatures: () => void;
};

async function resetUserData() {
  await fetch("/api/category-tracker", { method: "DELETE" });
}

export default function ControlPanel({
  data,
  loadingTime,
  setCountry,
  scrollToFeatures,
}: Props) {
  const [locationHover, setLocationHover] = useState(false);
  const [recentItemHover, setRecentItemHover] = useState(false);
  const [resetHover, setResetHover] = useState(false);

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const reset = async () => {
    await setCountry(null);
    await resetUserData();
    scrollToFeatures();

    startTransition(() => {
      router.refresh();
    });
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const inputElement = inputRef.current as HTMLInputElement | null;
      const isInputFocused = inputRef.current === document.activeElement;
      const modifier = e.getModifierState(e.key) || e.metaKey;

      if (isInputFocused) return;

      if (e.key === "r" && !modifier) {
        e.preventDefault();
        reset();
      }

      if (e.key === "l" && !modifier) {
        e.preventDefault();
        setLocationHover(false);
        if (inputElement) {
          inputElement.focus();
          inputElement.value = "";
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!data) return null;

  const { country } = data.personalized_section;
  const { category_name } = data.all_products_section;

  return (
    <div className="flex flex-col justify-center items-center fixed left-0 right-0 bottom-5 z-50">
      <div className="flex flex-row justify-center w-fit h-fit p-4 text-labels-regular font-medium shadow-card-hover-light dark:shadow-card-hover-dark rounded-2xl bg-base-light dark:bg-base-dark flex-wrap gap-x-4 gap-y-3 m-4">
        <div
          onMouseEnter={() => setLocationHover(true)}
          onMouseLeave={() => setLocationHover(false)}
          className="relative flex flex-col justify-center items-center"
        >
          {locationHover && (
            <HoverModal
              className="flex flex-row items-center justify-between gap-x-2 w-auto"
              tag="L"
            >
              Location
            </HoverModal>
          )}
          <CountryPicker
            country={country}
            setCountry={setCountry}
            inputRef={inputRef}
          />
        </div>
        <div
          className="relative flex flex-col justify-center items-center"
          onMouseEnter={() => setRecentItemHover(true)}
          onMouseLeave={() => setRecentItemHover(false)}
        >
          {recentItemHover && (
            <HoverModal className="w-[380px] text-center">
              Most recently viewed product category:
              <span className="text-base-light dark:text-base-dark">
                {" "}
                {category_name ?? "None"}
              </span>
              .
              <br />
              We use this to personalize the product grid.
            </HoverModal>
          )}
          <Button>
            <LastClick />
            <span className="text-subtle-light dark:text-subtle-dark">
              Last clicked:
            </span>
            <span> {category_name ?? "None"}</span>
          </Button>
        </div>
        <div
          onMouseEnter={() => setResetHover(true)}
          onMouseLeave={() => setResetHover(false)}
          className="relative flex flex-col justify-center items-center"
        >
          {resetHover && (
            <HoverModal
              className="flex flex-row items-center justify-between gap-x-2 w-auto"
              tag="R"
            >
              Reset
            </HoverModal>
          )}
          <Button onClick={reset}>
            <ArrowRefresh />
            <div>Reset</div>
          </Button>
        </div>
        <div className="flex flex-row items-center gap-2 border-solid border-l border-neutral-button-light dark:border-neutral-button-dark px-3 py-0 h-fit self-center">
          <span className="text-subtle-light dark:text-subtle-dark ">
            Loading:
          </span>
          {loadingTime}ms
          <span className="text-labels-xsmall text-subtle-light dark:text-subtle-dark rounded border-solid border border-tag-neutral-light dark:border-tag-neutral-dark bg-tag-neutral-light dark:bg-tag-neutral-dark px-1 ml-1">
            us-east-1
          </span>
        </div>
      </div>
    </div>
  );
}
