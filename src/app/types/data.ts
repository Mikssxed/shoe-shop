export type FiltersData = {
  genders: Base[];
  colors: Base[];
  categories: Base[];
  brands: Base[];
  sizes: Base[];
};

// TODO: add correct types from response

type Base = {
  id: number;
  name: string;
};
