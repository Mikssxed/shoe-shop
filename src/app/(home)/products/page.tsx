"use client";
import { FilterSidebar, ProductList } from "@/components/common";
import { useIsMobile } from "@/hooks";
import { Data, ProductAttributes } from "@/lib/types";
import { useFilters, useProducts } from "@/tools";
import { buildParams } from "@/utils";
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { FilterRemove, FilterSearch } from "iconsax-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const Products = () => {
  const theme = useTheme();
  const bottomElementRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();
  const [showFilters, setShowFilters] = useState(false);
  const { data, isLoading, hasNextPage, fetchNextPage } = useProducts(
    buildParams(searchParams)
  );
  const { data: filtersData } = useFilters();
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
