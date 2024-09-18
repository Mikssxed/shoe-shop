import { Stack } from "@mui/material";

import { getFiltersData, getMaxPrice, getProducts } from "@/tools";
import FilterToggle from "./FilterToggle";

const Products = async () => {
  const filters = await getFiltersData();
  const initialProducts = await getProducts(1);
  const maxPrice = await getMaxPrice();
  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ maxWidth: 1850, mx: "auto", px: "20px" }}
    >
      <FilterToggle
        maxPrice={maxPrice.data[0].attributes.price}
        initialProducts={initialProducts}
        filtersData={filters}
      />
    </Stack>
  );
};

export default Products;
