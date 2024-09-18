import {
  ApiResponse,
  ApiResponseList,
  BaseWithName,
  BaseWithValue,
  Data,
  RequestData,
} from "./data.type";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  teamName: "team-1" | "team-2" | "team-3";
};

type Image = {
  id: number;
  url: string;
  width: number;
  height: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
};

export type ProductAttributes = {
  categories?: RequestData<Data<BaseWithName>[]>;
  sizes?: RequestData<Data<BaseWithValue>[]>;
  images?: RequestData<Data<Image>[] | null>;
  brand?: RequestData<Data<BaseWithName>> | null;
  color?: RequestData<Data<BaseWithName> | null>;
  gender?: RequestData<Data<BaseWithName> | null>;
} & Product;

export type ProductResponse = ApiResponse<ProductAttributes>;
export type ProductsResponse = ApiResponseList<ProductAttributes>;
