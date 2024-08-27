"use client";
import { ImageSlider } from "@/components/common";
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
//TODO: dummy data - to delete
const product = {
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc nec",
  name: "Best boots ever",
  price: "21.37",
  gender: {
    data: {
      attributes: {
        name: "Male",
      },
    },
  },
  color: {
    data: {
      attributes: {
        name: "Red",
      },
    },
  },
  sizes: {
    data: [
      { id: 1, attributes: { value: 36 } },
      { id: 2, attributes: { value: 37 } },
      { id: 3, attributes: { value: 38 } },
      { id: 4, attributes: { value: 39 } },
      { id: 5, attributes: { value: 40 } },
      { id: 6, attributes: { value: 41 } },
      { id: 7, attributes: { value: 42 } },
      { id: 8, attributes: { value: 43 } },
      { id: 9, attributes: { value: 44 } },
      { id: 10, attributes: { value: 45 } },
    ],
  },
  categories: {
    data: [
      { id: 1, attributes: { name: "T-Shirts" } },
      { id: 2, attributes: { name: "Casual Wear" } },
    ],
  },
  images: {
    data: [
      {
        attributes: {
          url: "https://img.freepik.com/free-photo/pair-trainers_144627-3800.jpg",
        },
      },
      {
        attributes: {
          url: "https://img.freepik.com/darmowe-zdjecie/biale-plocienne-trampki-na-metalowej-podlodze_53876-96612.jpg?t=st=1724755753~exp=1724759353~hmac=58178245d88347b782b893597d0254b76cdde7f6e65cade45624a18cfebedaed&w=740",
        },
      },
      {
        attributes: {
          url: "https://img.freepik.com/free-photo/pair-trainers_144627-3800.jpg",
        },
      },
      {
        attributes: {
          url: "https://img.freepik.com/darmowe-zdjecie/biale-plocienne-trampki-na-metalowej-podlodze_53876-96612.jpg?t=st=1724755753~exp=1724759353~hmac=58178245d88347b782b893597d0254b76cdde7f6e65cade45624a18cfebedaed&w=740",
        },
      },
      {
        attributes: {
          url: "https://img.freepik.com/free-photo/pair-trainers_144627-3800.jpg",
        },
      },
      {
        attributes: {
          url: "https://img.freepik.com/darmowe-zdjecie/biale-plocienne-trampki-na-metalowej-podlodze_53876-96612.jpg?t=st=1724755753~exp=1724759353~hmac=58178245d88347b782b893597d0254b76cdde7f6e65cade45624a18cfebedaed&w=740",
        },
      },
    ],
  },
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

  const gender = product?.gender?.data?.attributes.name;
  const sizes = product?.sizes?.data;
  const images =
    product?.images?.data?.map(({ attributes: { url } }) => url) || [];

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
          <Typography variant="h1">{product?.name}</Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: "18px",
            }}
          >
            ${product?.price}
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
          <Box sx={{ gap: "8px", display: "flex", flexWrap: "wrap" }}>
            {/* TODO: map over correct data */}
            <Image
              src={images[0]}
              alt={`Image`}
              width={80}
              height={80}
              style={{
                cursor: "pointer",
                transition: "0.4  s",
                objectFit: "cover",
                borderRadius: "8px",
              }}
              onClick={goToThatProduct}
            />
            <Image
              src={images[0]}
              alt={`Image`}
              width={80}
              height={80}
              style={{
                cursor: "pointer",
                transition: "0.4  s",
                objectFit: "cover",
                borderRadius: "8px",
              }}
              onClick={goToThatProduct}
            />
            <Image
              src={images[0]}
              alt={`Image`}
              width={80}
              height={80}
              style={{
                cursor: "pointer",
                transition: "0.4  s",
                objectFit: "cover",
                borderRadius: "8px",
              }}
              onClick={goToThatProduct}
            />
            <Image
              src={images[0]}
              alt={`Image`}
              width={80}
              height={80}
              style={{
                cursor: "pointer",
                transition: "0.4  s",
                objectFit: "cover",
                borderRadius: "8px",
              }}
              onClick={goToThatProduct}
            />
          </Box>
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
                .sort((a, b) => a.attributes.value - b.attributes.value)
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
          <Typography sx={styles.productLabel}>
            {product?.description}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Product;
