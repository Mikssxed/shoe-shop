import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {User} from 'next-auth';
import {signIn} from 'next-auth/react';

import {
  ApiResponseList,
  BaseWithName,
  BaseWithValue,
  IForgotPasswordReq,
  IForgotPasswordRes,
  ILogInRequest,
  IResetPasswordRequest,
  IResetPasswordResponse,
  ISignUpRequest,
  ISignUpResponse,
  ProductResponse,
  ProductsResponse,
} from '@/lib/types';
import axiosInstance from '@/tools/axios';

/**
 * Fetches data from a given URL using axios and handles any errors.
 *
 * @template T
 * @param {string} url - The API endpoint to fetch data from.
 * @param {AxiosRequestConfig} [options={}] - Optional axios request configuration.
 * @returns {Promise<T>} - The data retrieved from the API.
 * @throws Will throw an error if the request fails.
 */
export const fetchData = async <T>(
  url: string,
  options: AxiosRequestConfig = {},
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance(url, options);
    return response.data;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw new Error('Could not get data');
  }
};

/**
 * Sends a POST request to a given URL using axios and handles errors.
 *
 * @template T
 * @param {string} url - The API endpoint to post data to.
 * @param {Record<string, any>} options - The data to be sent in the POST request.
 * @returns {Promise<T>} - The response data.
 * @throws Will throw an error if the request fails.
 */
export const postData = async <T>(
  url: string,
  options: Record<string, any>,
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.post(url, options);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data.error;
    } else {
      throw new Error('Unknown error while request');
    }
  }
};

/**
 * Fetches a paginated list of products from the API.
 *
 * @param {number} page - The page number to retrieve.
 * @param {Object} [params] - Optional query parameters for the request.
 * @returns {Promise<ProductsResponse>} - The response containing the product data.
 */
export const getProducts = async (
  page: number,
  params?: {},
): Promise<ProductsResponse> => {
  return fetchData<ProductsResponse>('/products', {
    params: {
      populate: '*',
      'pagination[page]': page,
      'pagination[pageSize]': 12,
      sort: 'createdAt:desc',
      'filters[teamName]': 'team-1',
      ...params,
    },
  });
};

/**
 * Fetches the maximum price of the products.
 *
 * @returns {Promise<ProductsResponse>} - The response containing the product with the maximum price.
 */
export const getMaxPrice = async (): Promise<ProductsResponse> => {
  return fetchData<ProductsResponse>('/products', {
    params: {
      'pagination[page]': 1,
      'pagination[pageSize]': 1,
      fields: 'price',
      sort: 'price:desc',
    },
  });
};

/**
 * Fetches a single product by its ID.
 *
 * @param {string} id - The ID of the product to retrieve.
 * @returns {Promise<ProductResponse>} - The response containing the product data.
 */
export const getProduct = async (id: string): Promise<ProductResponse> => {
  return fetchData<ProductResponse>(`/products/${id}`, {
    params: {
      populate: '*',
    },
  });
};

/**
 * Fetches product names matching a search string.
 *
 * @param {string} searchString - The string to search for in product names.
 * @returns {Promise<ProductsResponse>} - The response containing the product names.
 */
export const getProductsNames = async (
  searchString: string,
): Promise<ProductsResponse> => {
  return fetchData<ProductsResponse>('/products', {
    params: {
      fields: 'name',
      'filters[name][$containsi]': searchString,
      'filters[teamName]': 'team-1',
    },
  });
};

/**
 * Fetches filter data for genders, colors, categories, brands, and sizes.
 *
 * @returns {Promise<{ genders: ApiResponseList<BaseWithName>, colors: ApiResponseList<BaseWithName>, categories: ApiResponseList<BaseWithName>, brands: ApiResponseList<BaseWithName>, sizes: ApiResponseList<BaseWithValue> }>}
 * - An object containing filter data for various categories.
 * @throws Will throw an error if the request fails.
 */
export const getFiltersData = async () => {
  try {
    const [genders, colors, categories, brands, sizes] = await Promise.all([
      fetchData<ApiResponseList<BaseWithName>>('/genders'),
      fetchData<ApiResponseList<BaseWithName>>('/colors'),
      fetchData<ApiResponseList<BaseWithName>>('/categories'),
      fetchData<ApiResponseList<BaseWithName>>('/brands'),
      fetchData<ApiResponseList<BaseWithValue>>('/sizes'),
    ]);

    return {
      genders,
      colors,
      categories,
      brands,
      sizes,
    };
  } catch (error) {
    console.error('Error retrieving filters data:', error);
    throw new Error('Could not get filters data');
  }
};

/**
 * Attempts to log in a user using the provided credentials.
 *
 * @param {ILogInRequest} user - The user's login credentials.
 * @returns {Promise<any>} - The result of the sign-in attempt.
 */
export const logIn = async (user: ILogInRequest): Promise<any> => {
  const result = signIn('credentials', {
    redirect: false,
    identifier: user.identifier,
    password: user.password,
  });

  return result;
};

/**
 * Registers a new user using the provided information.
 *
 * @param {ISignUpRequest} user - The user's registration information.
 * @returns {Promise<ISignUpResponse>} - The response after registration.
 */
export const signUp = async (
  user: ISignUpRequest,
): Promise<ISignUpResponse> => {
  return postData<ISignUpResponse>('/auth/local/register', user);
};

/**
 * Sends a forgot password request to the API.
 *
 * @param {IForgotPasswordReq} data - The forgot password request data.
 * @returns {Promise<IForgotPasswordRes>} - The response after the request is processed.
 */
export const forgotPassword = async (
  data: IForgotPasswordReq,
): Promise<IForgotPasswordRes> => {
  return postData<IForgotPasswordRes>('/auth/forgot-password', data);
};

/**
 * Resets the user's password using the provided data.
 *
 * @param {IResetPasswordRequest} data - The reset password request data.
 * @returns {Promise<IResetPasswordResponse>} - The response after the password reset.
 */
export const resetPassword = async (
  data: IResetPasswordRequest,
): Promise<IResetPasswordResponse> => {
  return postData<IResetPasswordResponse>('/auth/reset-password', data);
};

/**
 * Fetches products associated with the currently authenticated user.
 *
 * @param {User} user - The authenticated user object.
 * @returns {Promise<ProductsResponse>} - The response containing the user's products.
 */
export const getMyProducts = async (user: User): Promise<ProductsResponse> => {
  return fetchData<ProductsResponse>('/products', {
    params: {
      'filters[userID]': user.id,
      populate: '*',
      'pagination[page]': 1,
      'pagination[pageSize]': 12,
      sort: 'createdAt:desc',
    },
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
  });
};
