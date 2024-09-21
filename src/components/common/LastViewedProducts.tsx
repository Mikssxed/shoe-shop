"use client";
import { useLastViewed } from "@/tools";
import { getLastViewedProductIds } from "@/utils";
import { Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";

type Props = {
  isFullWidth: boolean;
};

function LastViewedProducts({ isFullWidth }: Props) {
  const productIds = getLastViewedProductIds();

  const { data: products } = useLastViewed(productIds);

  if (!products?.length) {
    return null;
  }

  return (
    <>
      <Typography sx={{ marginBottom: "24px" }} variant="h1">
        Last viewed products
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, sm: 5, lg: 6, xl: 8 }}
        columns={{ xs: 12, md: 12, lg: 12, xl: isFullWidth ? 8 : 12 }}
        sx={{ position: "relative", marginBottom: "24px" }}
      >
        {products &&
          products.map((product, index) => (
            <Grid
              key={product.id}
              item
              xs={6}
              md={isFullWidth ? 4 : 6}
              lg={isFullWidth ? 3 : 4}
              xl={isFullWidth ? 2 : 3}
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
      </Grid>
    </>
  );
}

export default LastViewedProducts;
