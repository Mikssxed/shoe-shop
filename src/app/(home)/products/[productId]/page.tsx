import Image from "next/image";
import {
  Box,
  Container,
  Grid,
  Paper,
  SxProps,
  Typography,
} from "@mui/material";

import { ImageSlider, Sizes } from "@/components/common";
import { getProduct } from "@/tools";
import ActionButtons from "./ActionButtons";

type Props = {
  params: { productId: string };
};

const styles: Record<string, SxProps> = {
  productContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  productLabel: {
    textAlign: "left",
    fontSize: "16px",
    fontWeight: 300,
    maxWidth: "100%",
    lineBreak: "anywhere",
  },
};

const Product = async ({ params: { productId } }: Props) => {
  const product = await getProduct(productId);

  const {
    name,
    price,
    gender: genderData,
    sizes: sizesData,
    images: imagesData,
    description,
    color,
  } = product?.data.attributes || {};

  const gender = genderData?.data?.attributes.name;
  const sizes = sizesData?.data || [];
  const images = imagesData?.data?.map((image) => image.attributes.url) || [];

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1300px",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: "100px",
        marginTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <Box
        sx={{
          ...styles.productContainer,
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        {images.length > 0 ? (
          <ImageSlider images={images} />
        ) : (
          <Paper
            sx={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <Image fill src="/icons/galleryIcon.svg" alt="no image" />
          </Paper>
        )}
      </Box>
      <Box sx={styles.productContainer}>
        <Box
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            gap: "24px",
          }}
        >
          <Typography variant="h1">{name}</Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: "18px",
            }}
          >
            ${price}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "10px",
          }}
        >
          {gender && (
            <Typography variant="h4" sx={styles.productGender}>
              {gender}&apos;s Shoes
            </Typography>
          )}
          {color && (
            <Typography variant="h4" sx={styles.productLabel}>
              Color: {color?.data?.attributes.name}
            </Typography>
          )}
        </Box>
        {sizes && sizes.length !== 0 && (
          <Box
            sx={{
              marginTop: "10px",
              width: "100%",
            }}
          >
            <Typography variant="h4" sx={styles.productLabel}>
              Select Size
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{
                paddingTop: "14px",
              }}
            >
              <Sizes sizes={sizes} />
            </Grid>
          </Box>
        )}
        <Box
          sx={{
            marginTop: "10px",
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            gap: "10px",
            width: "100%",
          }}
        >
          <ActionButtons id={productId} />
        </Box>
        <Box
          sx={{
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <Typography variant="h4">Description</Typography>
          <Typography sx={styles.productLabel}>{description}</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Product;
