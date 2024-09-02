import {
  ApiResponseList,
  BaseWithName,
  BaseWithValue,
  ProductsResponse,
  IErrorResponse,
  IUserPost,
  IUserResponse,
} from "@/lib/types";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
});

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

export const signUp = async (user: IUserPost): Promise<IUserResponse> => {
  return postData<IUserResponse>("/auth/local/register", user);
};