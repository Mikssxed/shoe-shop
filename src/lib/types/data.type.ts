export type FiltersData = {
  genders: ApiResponseList<BaseWithName>;
  colors: ApiResponseList<BaseWithName>;
  categories: ApiResponseList<BaseWithName>;
  brands: ApiResponseList<BaseWithName>;
  sizes: ApiResponseList<BaseWithValue>;
};

export type Base = {
  id: number;
};

export type BaseWithName = Base & {
  name: string;
};

export type BaseWithValue = Base & {
  value: string;
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

export type ApiResponse<T> = ResponseData<Data<T>>;
export type ApiResponseList<T> = ResponseData<Data<T>[]>;
