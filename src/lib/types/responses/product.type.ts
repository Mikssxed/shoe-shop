export interface IAddProductResponse {
  data?: {
    id: number;
    attributes: {
      name: string;
      description: string;
      price: number;
      createdAt: string;
      updatedAt: string;
      publishedAt: 'string';
      teamName: 'string';
    };
  };
  meta?: {};
  error?: string;
}

export interface IEditProductResponse extends IAddProductResponse {}
