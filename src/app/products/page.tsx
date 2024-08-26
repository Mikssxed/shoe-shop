"use client";
import { FilterSidebar, ProductList } from "@/components/common";
import {
  Box,
  IconButton,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FilterRemove, FilterSearch } from "iconsax-react";
import { useEffect, useState } from "react";
import { FiltersData, Product } from "../types";

const styles: Record<string, SxProps> = {
  filterButtons: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
  },
};

// TODO: Remove this once the API is integrated
const fakeProducts: Product[] = [
  {
    price: 29.99,
    id: 1,
    name: "Wireless Mouse",
    image: "https://img.freepik.com/free-photo/pair-trainers_144627-3800.jpg",
  },
  {
    price: 199.99,
    id: 2,
    name: "Mechanical Keyboard",
    image: "https://img.freepik.com/free-photo/pair-trainers_144627-3800.jpg",
  },
  {
    price: 499.99,
    id: 3,
    name: "27-inch Monitor",
    image: "https://img.freepik.com/free-photo/pair-trainers_144627-3800.jpg",
  },
  {
    price: 99.99,
    id: 4,
    name: "Bluetooth Headphones",
    image: "https://img.freepik.com/free-photo/pair-trainers_144627-3800.jpg",
  },
  {
    price: 49.99,
    id: 5,
    name: "Portable SSD",
    image: "https://img.freepik.com/free-photo/pair-trainers_144627-3800.jpg",
  },
  {
    price: 14.99,
    id: 6,
    name: "USB-C Hub",
    image: "https://img.freepik.com/free-photo/pair-trainers_144627-3800.jpg",
  },
];

const fakeFiltersData: FiltersData = {
  genders: [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
    { id: 3, name: "Unisex" },
  ],
  colors: [
    { id: 1, name: "Red" },
    { id: 2, name: "Blue" },
    { id: 3, name: "Green" },
    { id: 4, name: "Black" },
    { id: 5, name: "White" },
  ],
  categories: [
    { id: 1, name: "Shirts" },
    { id: 2, name: "Pants" },
    { id: 3, name: "Shoes" },
    { id: 4, name: "Accessories" },
  ],
  brands: [
    { id: 1, name: "Brand A" },
    { id: 2, name: "Brand B" },
    { id: 3, name: "Brand C" },
    { id: 4, name: "Brand D" },
  ],
  sizes: [
    { id: 1, name: "Small" },
    { id: 2, name: "Medium" },
    { id: 3, name: "Large" },
    { id: 4, name: "X-Large" },
  ],
};

const Products = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setShowFilters(false);
      return;
    }
    setShowFilters(true);
  }, [isMobile]);

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ maxWidth: 1850, marginX: "auto" }}
    >
      <FilterSidebar
        onClose={() => setShowFilters(false)}
        isMobile={isMobile}
        open={showFilters}
        searchingString={""}
        productsCount={0}
        filtersData={fakeFiltersData}
      />
      <Box sx={{ padding: { xs: "0 24px", md: 0 }, marginTop: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 3,
          }}
        >
          <Typography variant="h1">Search Results</Typography>
          <IconButton
            onClick={handleShowFilters}
            sx={{ fontSize: { xs: "15px", md: "24px" } }}
          >
            {isMobile
              ? "Filters"
              : showFilters
              ? "Hide Filters"
              : "Show Filters"}
            {showFilters ? (
              <FilterRemove color={theme.palette.text.secondary} />
            ) : (
              <FilterSearch color={theme.palette.text.secondary} />
            )}
          </IconButton>
        </Box>
        <ProductList fullWidth={!showFilters} products={fakeProducts} />
      </Box>
    </Stack>
  );
};

export default Products;
