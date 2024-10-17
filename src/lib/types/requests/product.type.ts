export interface IAddProductRequest {
  data: {
    price: number;
    gender: number;
    brand: number;
    color: number;
    name: string;
    images: number[] | File[];
    description: string;
    sizes: number[];
    userID: string;
    teamName: string;
  };
}

export interface IEditProductRequest extends IAddProductRequest {
  id: number;
}
