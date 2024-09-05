"use client";
import { FilterSidebar, ProductList } from "@/components/common";
import { useIsMobile } from "@/hooks";
import { useFilters } from "@/tools";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { FilterRemove, FilterSearch } from "iconsax-react";
import { useEffect, useState } from "react";

const Products = () => {
  const theme = useTheme();

  const isMobile = useIsMobile();
  const [showFilters, setShowFilters] = useState(false);
  const { data: filtersData } = useFilters();

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
      sx={{ maxWidth: 1850, marginX: "auto", paddingX: "20px" }}
    >
      {filtersData && (
        <FilterSidebar
          onClose={() => setShowFilters(false)}
          isMobile={isMobile}
          open={showFilters}
          searchingString={""}
          productsCount={0}
          filtersData={filtersData}
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
        <ProductList fullWidth={!showFilters} />
      </Box>
    </Stack>
  );
};

export default Products;
