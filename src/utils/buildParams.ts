import { ReadonlyURLSearchParams } from "next/navigation";

export default function buildParams(
  query: ReadonlyURLSearchParams,
  additionalParams: Record<string, string | number> = {}
) {
  const params: typeof additionalParams = {};

  const genders = query.getAll("gender");
  const brands = query.getAll("brand");
  const colors = query.getAll("color");
  const sizes = query.getAll("sizes");
  const categories = query.getAll("categories");

  const searchString = query.get("search");
  const minPrice = query.get("minPrice") || 0;
  const maxPrice = query.get("maxPrice") || Infinity;

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

  params["filters[name][$containsi]"] = searchString as string;
  params["filters[price][$gte]"] = minPrice as string;
  params["filters[price][$lte]"] = maxPrice as string;

  return Object.assign(params, additionalParams);
}
