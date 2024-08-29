import { ProductsResponse } from "@/lib/types";
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

export const getProducts = async (page: number) => {
  return fetchData<ProductsResponse>("/products", {
    params: {
      populate: "*",
      "pagination[page]": page,
      "pagination[pageSize]": 12,
    },
  });
};
