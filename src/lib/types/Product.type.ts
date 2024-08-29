import { Data, RequestData, ResponseData } from "./data";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  teamName: "team-1" | "team-2" | "team-3";
};

type BaseWithName = {
  name: string;
  id: number;
};

type BaseWithValue = {
  value: string;
  id: number;
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

export type ProductAttributes = Partial<
  Product & {
    categories: RequestData<Data<BaseWithName>[]>;
    sizes: RequestData<Data<BaseWithValue>[]>;
    images: RequestData<Data<Image>[] | null>;
    brand: RequestData<Data<BaseWithName>> | null;
    color: RequestData<Data<BaseWithName> | null>;
    gender: RequestData<Data<BaseWithName> | null>;
  }
>;

export type ProductResponse = ResponseData<Data<ProductAttributes>>;
export type ProductsResponse = ResponseData<Data<ProductAttributes>[]>;
