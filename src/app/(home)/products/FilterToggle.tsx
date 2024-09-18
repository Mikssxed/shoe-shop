"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, IconButton, Typography } from "@mui/material";
import { FilterRemove, FilterSearch } from "iconsax-react";

import { FilterSidebar, ProductList } from "@/components/common";
import { useIsMobile } from "@/hooks";
import { FiltersData, ProductsResponse } from "@/lib/types";
import { stylingConstants } from "@/lib/constants/themeConstants";

type Props = {
  filtersData: FiltersData;
  initialProducts: ProductsResponse;
  maxPrice: number;
};

function FilterToggle({ filtersData, initialProducts, maxPrice }: Props) {
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();

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
    <>
      {filtersData && (
        <FilterSidebar
          onClose={() => setShowFilters(false)}
          isMobile={isMobile}
          open={showFilters}
          searchingString={""}
          productsCount={0}
          filtersData={filtersData}
          maxPrice={maxPrice}
        />
      )}
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
          <Typography variant="h1">
            Search Results
            {searchParams.has("search")
              ? `: "${searchParams.get("search")}"`
              : ""}
          </Typography>
          <IconButton
            onClick={handleShowFilters}
            sx={{
              fontSize: {
                xs: "15px",
                md: "24px",
                position: "relative",
                zIndex: 1,
              },
            }}
          >
            {isMobile
              ? "Filters"
              : showFilters
              ? "Hide Filters"
              : "Show Filters"}
            {showFilters ? (
              <FilterRemove color={stylingConstants.palette.text.secondary} />
            ) : (
              <FilterSearch color={stylingConstants.palette.text.secondary} />
            )}
          </IconButton>
        </Box>
        <ProductList
          initialProducts={initialProducts}
          fullWidth={!showFilters}
        />
      </Box>
    </>
  );
}

export default FilterToggle;
