"use client";
import { ImageSlider } from "@/components/common";
import { useProduct } from "@/tools";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  SxProps,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

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
  actionButton: {
    flexBasis: "50%",
    padding: {
      xs: "10px 15px",
      sm: "16px 20px",
    },
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

const Product = ({ params: { productId } }: Props) => {
  const [choosedSize, setChoosedSize] = useState(0);
  const { data: product } = useProduct(productId);

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

  const addToBag = () => {
    //TODO: add to bag logic
  };

  const addToFav = () => {
    //TODO: add to fav logic
  };

  const goToThatProduct = () => {
    //TODO: go to that product logic
  };

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
              {sizes
                .sort((a, b) => +a.attributes.value - +b.attributes.value)
                .map(({ id, attributes: { value } }) => {
                  const isChecked = id === choosedSize;
                  return (
                    <Grid key={id} xs={3} sm={2} md={3} lg={2} item>
                      <Button
                        sx={{
                          width: "100%",
                          fontWeight: "fontWeighRegular",
                          fontSize: { xs: 10, sm: 15 },
                          textTransform: "uppercase",
                          borderColor: "grey.700",
                          padding: { xs: "8px 15px", sm: "10px 20px" },
                          "&:hover": {
                            borderColor: "grey.700",
                            backgroundColor: "grey.100",
                          },
                          borderRadius: "12px",
                          color: isChecked ? "white" : "text.secondary",
                        }}
                        variant={isChecked ? "contained" : "outlined"}
                        onClick={() => setChoosedSize(id)}
                      >
                        EU-{value}
                      </Button>
                    </Grid>
                  );
                })}
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
          <Button
            onClick={addToFav}
            variant="outlined"
            sx={styles.actionButton}
          >
            Favorite
          </Button>
          <Button
            onClick={addToBag}
            variant="contained"
            sx={styles.actionButton}
          >
            Add to Bag
          </Button>
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
