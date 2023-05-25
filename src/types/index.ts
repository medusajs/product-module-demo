export type UserData = {
  categoryId: string;
  categoryName: string;
};

export type ContinentMapping = {
  [key: string]: { article: string; name: string };
}

export type Iso2AlphaCountry = {
  [key: string]: { name: string; continent: string };
}