"use client";

import { ProductOption } from "@medusajs/medusa";
import clsx from "clsx";
import { useMemo } from "react";
import { useInteractive } from "./Interactive";

type OptionSelectProps = {
  option: ProductOption;
};

const onlyUnique = (value: unknown, index: number, self: unknown[]) =>
  self.indexOf(value) === index;

const OptionSelect = ({ option }: OptionSelectProps) => {
  const { options, updateOptions } = useInteractive();

  const current = useMemo(() => {
    return options[option.id];
  }, [options, option]);

  const uniqueValues = option.values.map((v) => v.value).filter(onlyUnique);

  const handleSelect = (value: string) => {
    updateOptions({ [option.id]: value });
  };

  return (
    <div className="flex flex-col gap-y-2">
      <span className="text-sm text-gray-500">
        Select {option.title.toLowerCase()}
      </span>
      <div className="grid grid-cols-6 gap-2 box-border text-sm">
        {uniqueValues.map((v) => {
          return (
            <button
              type="button"
              key={v}
              onClick={() => handleSelect(v)}
              className={clsx(
                "flex items-center justify-center py-3 box-border transition-colors",
                {
                  "border border-gray-300": current !== v,
                  "border-2 border-gray-900": current === v,
                }
              )}
            >
              {v}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OptionSelect;
