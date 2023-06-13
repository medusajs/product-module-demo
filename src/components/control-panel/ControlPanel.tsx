"use client";

import { PersonalizationData } from "@/types";
import { LastClick } from "../icons/lastclick";
import { ArrowRefresh } from "../icons/arrow-refresh";
import { Button } from "../common";
import CountryPicker from "./CountryPicker";
import { startTransition, useEffect, useRef, useState } from "react";
import HoverModal from "./HoverModal";

type Props = {
  data: PersonalizationData | null;
  selectedCountry?: string;
  loadingTime: number;
};

function setQ(q: string | null) {
  const searchParams = new URLSearchParams(window.location.search);
  if (!q) {
    searchParams.delete("cc");
  } else {
    searchParams.set("cc", q);
  }
  window.location.search = searchParams.toString();
}

async function resetUserData() {
  await fetch("/api/category-tracker", { method: "DELETE" });
}

export default function ControlPanel({ data, loadingTime }: Props) {
  const [locationHover, setLocationHover] = useState(false);
  const [recentItemHover, setRecentItemHover] = useState(false);
  const [resetHover, setResetHover] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const reset = async () => {
    await resetUserData();
    setQ("");

    startTransition(() => {
      window.scrollTo(0, 0);
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

  useEffect(() => {
    const onScroll = () => setIsVisible(false);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const togglePanel = () => {
    setIsVisible((v) => !v);
  };

  if (!data) return null;

  const { country } = data.personalized_section;
  const { category_name } = data.all_products_section;

  return (
    <div
      style={{
        transform: `translateY(${isVisible ? 0 : 196}px)`,
        transition: "0.3s all",
      }}
      className="flex justify-center items-center fixed left-0 right-0 bottom-0 lg:bottom-5 z-30 px-4 xl:px-0 lg:p-0 w-[100%] pointer-events-none"
    >
      <div className="flex flex-col-reverse lg:flex-row justify-center h-fit p-4 text-labels-regular font-medium shadow-card-hover-light dark:shadow-card-hover-dark rounded-2xl bg-base-light dark:bg-base-dark flex-wrap gap-x-4 gap-y-3 m-4 max-w-[100%] pointer-events-auto">
        <div
          onMouseEnter={() => setLocationHover(true)}
          onMouseLeave={() => setLocationHover(false)}
          className="relative flex flex-col justify-center items-center px-3 lg:p-0 max-w-[100%]"
        >
          {locationHover && (
            <HoverModal
              className="sm:flex flex-row items-center justify-between gap-x-2 w-auto"
              tag="L"
            >
              Location
            </HoverModal>
          )}
          <CountryPicker
            country={country}
            setCountry={(c) => setQ(c.code)}
            inputRef={inputRef}
          />
        </div>
        <div className="relative flex flex-row gap-2 lg:gap-4 justify-center items-center px-3 lg:p-0 max-w-[100%]">
          {recentItemHover && (
            <HoverModal className="sm:block w-[380px] mx-w-[100%] text-center">
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
          <div
            className="w-[100%]"
            onMouseEnter={() => setRecentItemHover(true)}
            onMouseLeave={() => setRecentItemHover(false)}
          >
            <Button className="cursor-help w-[100%]" left>
              <LastClick />
              <span className="text-subtle-light dark:text-subtle-dark pl-3 lg:pl-0">
                Last Clicked:
              </span>
              <span> {category_name ?? "None"}</span>
            </Button>
          </div>
          <div
            onMouseEnter={() => setResetHover(true)}
            onMouseLeave={() => setResetHover(false)}
            className="relative flex flex-row justify-center items-center"
          >
            {resetHover && (
              <HoverModal
                className="sm:flex flex-row items-center justify-between gap-x-2 w-auto"
                tag="R"
              >
                Reset
              </HoverModal>
            )}
            <Button onClick={reset}>
              <ArrowRefresh />
            </Button>
          </div>
        </div>
        <div
          style={{
            left: "1rem",
            width: `calc(100% - 2rem)`,
          }}
          className=" xl:hidden h-0 w-full absolute top-[112px] left-0 w-full border-b lg:border-b-0 border-neutral-button-light dark:border-neutral-button-dark"
        />
        <div className="flex flex-row items-center gap-2 border-solid lg:border-l border-neutral-button-light dark:border-neutral-button-dark p-5 pt-3 lg:pt-0 lg:px-3 mb-2 lg:mb-0 lg:py-0 h-fit w-screen lg:w-fit justify-between self-center max-w-[100%]">
          <div>
            <span className="text-subtle-light dark:text-subtle-dark">
              Response time:
            </span>{" "}
            {loadingTime}ms
          </div>
          <span className="text-labels-xsmall text-subtle-light dark:text-subtle-dark rounded border-solid border border-tag-neutral-light dark:border-tag-neutral-dark bg-tag-neutral-light dark:bg-tag-neutral-dark px-1 ml-2">
            us-east-1
          </span>
        </div>

        {/* MOBILE CLICK */}

        <div
          onClick={togglePanel}
          className="lg:hidden p-2 flex items-center justify-center"
        >
          <div className=" h-[3px] w-[80px] bg-base-light rounded" />
        </div>
      </div>
    </div>
  );
}
