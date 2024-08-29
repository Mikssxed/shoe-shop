export type FiltersData = {
  genders: Base[];
  colors: Base[];
  categories: Base[];
  brands: Base[];
  sizes: Base[];
};

// TODO: add correct types from response

export type Base = {
  id: number;
  name: string;
};

export type RequestData<T> = {
  data: T;
};

export type ResponseData<T> = {
  data: T;
  meta: Meta;
};

type Meta = {
  pagination?: Pagination;
};

type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type Data<T> = {
  id: number;
  attributes: DefaultAttributes & T;
};

type DefaultAttributes = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};
