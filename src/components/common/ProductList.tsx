"use client";

import { useProducts } from "@/tools";
import { buildParams } from "@/utils";
import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { BagCross1 } from "iconsax-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";

type Props = {
  fullWidth?: boolean;
};

const ProductList = ({ fullWidth }: Props) => {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const {
    data: products,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useProducts(buildParams(searchParams));

  const bottomElementRef = useRef<HTMLDivElement>(null);

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
    <Grid
      container
      spacing={{ xs: 2, sm: 5, lg: 6, xl: 8 }}
      columns={{ xs: 12, md: 12, lg: 12, xl: fullWidth ? 8 : 12 }}
      sx={{ position: "relative" }}
    >
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: "0%",
            left: "50%",
            transform: "translate(-50%, 0%)",
            zIndex: 10,
          }}
        >
          <CircularProgress size={100} />
        </Box>
      )}
      {products && products?.length <= 0 && (
        <Grid item xs={12} display="flex" justifyContent="center" marginY={5}>
          <Stack gap={1} marginY={2}>
            <Avatar
              sx={{
                width: 72,
                height: 72,
                marginX: "auto",
              }}
            >
              <BagCross1
                size="20"
                color={theme.palette.grey[500]}
                variant="Outline"
              />
            </Avatar>
            <Typography variant="h4" textAlign="center">
              {"We couldn't find any products"}
            </Typography>
            <Typography fontWeight={300} textAlign="center">
              {"Try adjusting your search or filter to find what you want"}
            </Typography>
          </Stack>
        </Grid>
      )}
      {products &&
        products.map((product, index) => (
          <Grid
            key={product.id}
            item
            xs={6}
            md={fullWidth ? 4 : 6}
            lg={fullWidth ? 3 : 4}
            xl={fullWidth ? 2 : 3}
            sx={{
              display: "flex",
              justifyContent: "center",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <ProductCard
              imagePriority={index === 0}
              product={{ ...product.attributes, id: product.id }}
            />
          </Grid>
        ))}
      <div ref={bottomElementRef} />
    </Grid>
  );
};
export default ProductList;
