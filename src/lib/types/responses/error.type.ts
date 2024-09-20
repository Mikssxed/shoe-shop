export interface IErrorResponse {
  data: {
    error: {
      status: number;
      name: string;
      message: string;
      details: {};
    };
  };
}

export interface IReactQueryError {
  message: string;
  name: string;
  code: string;
  config: any;
  request: any;
  response: IErrorResponse;
}
