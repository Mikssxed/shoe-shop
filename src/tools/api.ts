import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { signIn } from "next-auth/react";

import {
  ApiResponseList,
  BaseWithName,
  BaseWithValue,
  ProductResponse,
  ProductsResponse,
  ISignUpRequest,
  ISignUpResponse,
  ILogInRequest,
  IForgotPasswordReq,
  IForgotPasswordRes,
  IErrorResponse,
} from "@/lib/types";
import axiosInstance from "@/tools/axios";

export const fetchData = async <T>(
  url: string,
  options: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance(url, options);
    return response.data;
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw new Error("Could not get data");
  }
};

export const postData = async <T>(
  url: string,
  options: Record<string, any>
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.post(url, options);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("Unkhown error while request");
    }
  }
};

export const getProducts = async (page: number, params?: {}) => {
  return fetchData<ProductsResponse>("/products", {
    params: {
      populate: "*",
      "pagination[page]": page,
      "pagination[pageSize]": 12,
      ...params,
    },
  });
};

export const getMaxPrice = async () => {
  return fetchData<ProductsResponse>("/products", {
    params: {
      "pagination[page]": 1,
      "pagination[pageSize]": 1,
      fields: "price",
      sort: "price:desc",
    },
  });
};

export const getProduct = async (id: string) => {
  return fetchData<ProductResponse>(`/products/${id}`, {
    params: {
      populate: "*",
    },
  });
};

export const getFiltersData = async () => {
  try {
    const [genders, colors, categories, brands, sizes] = await Promise.all([
      fetchData<ApiResponseList<BaseWithName>>("/genders"),
      fetchData<ApiResponseList<BaseWithName>>("/colors"),
      fetchData<ApiResponseList<BaseWithName>>("/categories"),
      fetchData<ApiResponseList<BaseWithName>>("/brands"),
      fetchData<ApiResponseList<BaseWithValue>>("/sizes"),
    ]);

    return {
      genders,
      colors,
      categories,
      brands,
      sizes,
    };
  } catch (error) {
    console.error("Error retrieving filters data:", error);
    throw new Error("Could not get filters data");
  }
};

export const logIn = async (user: ILogInRequest) => {
  const result = signIn("credentials", {
    redirect: false,
    identifier: user.identifier,
    password: user.password,
  });

  return result;
};

export const signUp = async (
  user: ISignUpRequest
): Promise<ISignUpResponse> => {
  return postData<ISignUpResponse>("/auth/local/register", user);
};

export const forgotPassword = async (
  data: IForgotPasswordReq
): Promise<IForgotPasswordRes> => {
  return postData<IForgotPasswordRes>("/auth/forgot-password", data);
};
