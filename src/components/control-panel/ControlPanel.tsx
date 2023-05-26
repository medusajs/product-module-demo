"use client";

import { Country, PersonalizationData } from "@/types";
import { LastClick } from "../icons/lastclick";
import { ArrowRefresh } from "../icons/arrow-refresh";
import { Button } from "../common";
import CountryPicker from "./CountryPicker";
import { useCallback, useEffect, useRef } from "react";

type Props = {
  data: PersonalizationData | null;
  selectedCountry?: string;
  isLoading: boolean;
  loadingTime: number;
  setCountry: (country: Country | null) => void;
};

export default function ControlPanel({
  data,
  isLoading,
  loadingTime,
  setCountry,
}: Props) {
  if (isLoading) return null;
  if (!data) return null;

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
    <div className="flex justify-center fixed left-0 right-0 bottom-5 z-50">
      <div className="flex flex-row justify-between gap-x-4 w-fit h-fit p-4 text-labels-regular font-medium shadow-card-hover-light dark:shadow-card-hover-dark rounded-2xl bg-base-light dark:bg-base-dark">
        <CountryPicker
          country={country}
          setCountry={setCountry}
          inputRef={inputRef}
        />
        <Button>
          <LastClick />
          <span className="text-subtle-light dark:text-subtle-dark">
            Last clicked:
          </span>
          <span>{category_name}</span>
        </Button>
        <Button onClick={reset}>
          <ArrowRefresh />
          <div>Reset</div>
        </Button>
        <div className="flex flex-row items-center gap-2 border-solid border-l border-neutral-button-light dark:border-neutral-button-dark px-3 py-0 h-fit self-center">
          <span className="text-subtle-light dark:text-subtle-dark ">
            Loading:
          </span>
          {loadingTime}ms
        </div>
      </div>
    </div>
  );
}
