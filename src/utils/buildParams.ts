import { ReadonlyURLSearchParams } from 'next/navigation';

/**
 * Builds query parameters for an API request based on URL search parameters and additional parameters.
 * The function extracts multiple filters like gender, brand, color, size, categories, and price range
 * from the URL search params and formats them into a query object. It also appends any additional parameters provided.
 *
 * @param {ReadonlyURLSearchParams} query - The URL search parameters from which filters are extracted.
 * @param {Record<string, string | number>} [additionalParams={}] - Additional parameters to append to the final query.
 * @returns {Record<string, string | number>} - The resulting object containing all formatted query parameters.
 *
 * @example
 * const query = new URLSearchParams('?gender=male&brand=nike&minPrice=50&maxPrice=200');
 * const additionalParams = { sort: 'price:asc' };
 * const result = buildParams(query, additionalParams);
 * // result => {
 * //   "filters[gender][name][0]": "male",
 * //   "filters[brand][name][0]": "nike",
 * //   "filters[price][$gte]": 50,
 * //   "filters[price][$lte]": 200,
 * //   "sort": "price:asc"
 * // }
 */
export default function buildParams(
  query: ReadonlyURLSearchParams,
  additionalParams: Record<string, string | number> = {},
): Record<string, string | number> {
  const params: typeof additionalParams = {};

  const genders = query.getAll('gender');
  const brands = query.getAll('brand');
  const colors = query.getAll('color');
  const sizes = query.getAll('sizes');
  const categories = query.getAll('categories');

  const searchString = query.get('search');
  const minPrice = query.get('minPrice') || 0;
  const maxPrice = query.get('maxPrice') || Infinity;

  genders.forEach((value, index) => {
    params[`filters[gender][name][${index}]`] = value;
  });

  brands.forEach((value, index) => {
    params[`filters[brand][name][${index}]`] = value;
  });

  colors.forEach((value, index) => {
    params[`filters[color][name][${index}]`] = value;
  });

  categories.forEach((value, index) => {
    params[`filters[categories][name][${index}]`] = value;
  });

  sizes.forEach((value, index) => {
    params[`filters[sizes][value][${index}]`] = value;
  });

  params['filters[name][$containsi]'] = searchString || '';
  params['filters[price][$gte]'] = minPrice;
  params['filters[price][$lte]'] = maxPrice;

  return Object.assign(params, additionalParams);
}
