"use client";
import { FilterSidebar, ProductList } from "@/components/common";
import { useIsMobile } from "@/hooks";
import { Data, FiltersData, ProductAttributes } from "@/lib/types";
import { useProducts } from "@/tools";
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { FilterRemove, FilterSearch } from "iconsax-react";
import { useEffect, useMemo, useRef, useState } from "react";

// TODO: Remove this once the API is integrated
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
  const bottomElementRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();
  const [showFilters, setShowFilters] = useState(false);
  const { data, isLoading, hasNextPage, fetchNextPage } = useProducts();

  const products: Data<ProductAttributes>[] | undefined = useMemo(
    () => data?.pages.flatMap((page) => page.data),
    [data]
  );

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        });
      },
      { threshold: 1 }
    );

    const bottomElement = bottomElementRef.current;
    if (bottomElement) {
      observer.observe(bottomElement);
    }

    return () => {
      if (bottomElement) {
        observer.unobserve(bottomElement);
      }
    };
  }, [bottomElementRef, hasNextPage, fetchNextPage]);

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ maxWidth: 1850, marginX: "auto", paddingX: "20px" }}
    >
      <FilterSidebar
        onClose={() => setShowFilters(false)}
        isMobile={isMobile}
        open={showFilters}
        searchingString={""}
        productsCount={0}
        filtersData={fakeFiltersData}
      />
      <Box
        sx={{ padding: { xs: "0 24px", md: 0 }, marginTop: 3, width: "100%" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 3,
            width: "100%",
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
        {isLoading && (
          <Box
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <CircularProgress size={100} />
          </Box>
        )}
        {products && (
          <ProductList fullWidth={!showFilters} products={products} />
        )}
        <div ref={bottomElementRef} />
      </Box>
    </Stack>
  );
};

export default Products;
