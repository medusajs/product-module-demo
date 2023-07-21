"use client";

import {
  PricedProduct,
  PricedVariant,
} from "@medusajs/client-types";
import { isEqual } from "lodash";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Values = {
  variant: PricedVariant | undefined;
  options: Record<string, string>;
  updateOptions: (update: Record<string, string>) => void;
};

const InteractiveContext = createContext<Values | null>(null);

export const useInteractive = () => {
  const context = useContext(InteractiveContext);

  if (!context) {
    throw new Error(`useInteractive must be used within a InteractiveProvider`);
  }

  return context;
};

type InteractiveProviderProps = PropsWithChildren<{
  product: PricedProduct;
}>;

const InteractiveProvider = ({
  children,
  product,
}: InteractiveProviderProps) => {
  const [opts, setOpts] = useState<Record<string, string>>({});

  const { variants = [], options = [] } = product;

  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {};

    for (const variant of variants) {
      const tmp: Record<string, string> = {};

      const variantOptions = variant.options || [];

      for (const option of variantOptions) {
        tmp[option.option_id] = option.value;
      }

      map[variant.id!] = tmp;
    }

    return map;
  }, [variants]);

  const variant = useMemo(() => {
    let variantId: string | undefined = undefined;

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], opts)) {
        variantId = key;
      }
    }

    return variants.find((v) => v.id === variantId);
  }, [opts, variantRecord, variants]);

  useEffect(() => {
    if (variants.length) {
      setOpts(variantRecord[variants[0].id!]);
      return;
    }

    const optionObj: Record<string, string> = {};

    for (const option of options) {
      Object.assign(optionObj, { [option.id]: undefined });
    }

    setOpts(optionObj);
  }, [options, variants, variantRecord]);

  const updateOptions = (update: Record<string, string>) => {
    setOpts({ ...opts, ...update });
  };

  return (
    <InteractiveContext.Provider
      value={{
        variant,
        options: opts,
        updateOptions,
      }}
    >
      {children}
    </InteractiveContext.Provider>
  );
};

export default InteractiveProvider;
