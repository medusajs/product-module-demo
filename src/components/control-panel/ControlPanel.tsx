"use client";

import { Country, PersonalizationData } from "@/types";
import { LastClick } from "../icons/lastclick";
import { ArrowRefresh } from "../icons/arrow-refresh";
import { Button } from "../common";
import CountryPicker from "./CountryPicker";
import { useCallback, useEffect, useRef, useState } from "react";
import HoverModal from "./HoverModal";

type Props = {
  data: PersonalizationData | null;
  selectedCountry?: string;
  loadingTime: number;
  setCountry: (country: Country | null) => void;
};

export default function ControlPanel({ data, loadingTime, setCountry }: Props) {
  if (!data) return null;

  const [locationHover, setLocationHover] = useState(false);
  const [recentItemHover, setRecentItemHover] = useState(false);
  const [resetHover, setResetHover] = useState(false);

  const { country } = data.personalized_section;
  const { category_name } = data.all_products_section;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const reset = () => {
    setCountry(null);
  };

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const inputElement = inputRef.current as HTMLInputElement | null;
      const isInputFocused = inputRef.current === document.activeElement;

      if (e.key === "r" && !isInputFocused) {
        reset();
      }

      if (e.key === "l") {
        e.preventDefault();
        if (inputElement) {
          inputElement.focus();
          inputElement.value = "";
        }
      }
    },
    [reset]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div className="flex flex-col justify-center items-center fixed left-0 right-0 bottom-5 z-50">
      <div className="flex flex-row justify-between gap-x-4 w-fit h-fit p-4 text-labels-regular font-medium shadow-card-hover-light dark:shadow-card-hover-dark rounded-2xl bg-base-light dark:bg-base-dark">
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
            <HoverModal className="w-[350px] text-center">
              Most Recently Viewed Product:
              <span className="text-base-light dark:text-base-dark">
                {" "}
                {category_name}.
                <br />
              </span>
              We use this to personalize the product grid
            </HoverModal>
          )}
          <Button>
            <LastClick />
            <span className="text-subtle-light dark:text-subtle-dark">
              Last clicked:
            </span>
            <span>{category_name}</span>
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
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
