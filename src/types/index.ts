import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

export type UserData = {
  categoryId: string;
  categoryName: string;
};

export type ContinentMapping = {
  [key: string]: { article: string; name: string };
};

export type Iso2AlphaCountry = {
  [key: string]: { name: string; continent: string };
};

export type PersonalizationData = {
  personalized_section: {
    country: string;
    continent_text: {
      name: string;
      article: string;
    };
    products: PricedProduct[];
  };
  all_products_section: {
    category_name: string;
    products: PricedProduct[];
  };
};

export type Country = {
  code: string;
  name: string;
};
