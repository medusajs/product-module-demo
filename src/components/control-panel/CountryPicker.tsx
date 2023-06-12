import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDown } from "../icons/chevron-up-down";
import { Globe } from "../icons/globe";
import { isoAlpha2Countries } from "@/lib";
import { Country } from "@/types";

type Props = {
  country: string;
  setCountry: (countryCode: Country) => void;
};

const countryCodeMap = new Map<string, string>();

for (const countryCode of Object.keys(isoAlpha2Countries)) {
  countryCodeMap.set(isoAlpha2Countries[countryCode].name, countryCode);
}

const countries = Array.from(countryCodeMap, ([name, code]) => ({
  name,
  code,
})).sort((country1, country2) => country1.name.localeCompare(country2.name));

export default function CountryPicker({ country, setCountry }: Props) {
  const [query, setQuery] = useState("");

  const filteredCountries =
    query === ""
      ? countries
      : countries.filter((country: Country) =>
          country.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-[100%] lg:w-60 h-fit">
      <Combobox value={country} onChange={(value: any) => setCountry(value)}>
        <div className="relative z-40">
          <div className="flex flex-row gap-2 text-labels-regular font-medium rounded-[7px] border bg-gradient-to-b from-white dark:from-[#2E2E32] to-[#F8F9FA] dark:to-[#28282C] text-base-light dark:text-base-dark border-neutral-button-light dark:border-neutral-button-dark">
            <Combobox.Button className="flex items-center justify-center flex-row w-full border-none pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 rounded border bg-gradient-to-b from-white dark:from-[#2E2E32] to-[#F8F9FA] dark:to-[#28282C] text-base-light dark:text-base-dark">
              <Globe />
              <Combobox.Input
                className="w-full border-none py-2 pl-3 rounded border bg-gradient-to-b from-white dark:from-[#2E2E32] to-[#F8F9FA] dark:to-[#28282C] text-base-light dark:text-base-dark overflow-hidden text-ellipsis outline-none"
                displayValue={(country: string) => country}
                onChange={(event) => setQuery(event.target.value)}
              ></Combobox.Input>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto shadow-card-hover-light dark:shadow-card-hover-dark rounded-2xl bg-base-light dark:bg-base-dark bottom-16 py-1 text-base-light dark:text-base-dark ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredCountries.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredCountries.map((country) => (
                  <Combobox.Option
                    key={country.code}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-focus text-base-light dark:text-base-dark"
                          : "text-base-light dark:text-base-dark"
                      }`
                    }
                    value={country}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {country.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <span className="h-5 w-5" aria-hidden="true">
                              •
                            </span>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
