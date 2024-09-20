import Image from 'next/image';
import { Box, Container, Paper, Typography } from '@mui/material';

import { getProduct } from '@/tools';
import { ImageSlider } from '@/components/common';
import ActionButtons from './ActionButtons';
import { productIdStyles as styles } from '@/styles/product/product.style';

type Props = {
  params: { productId: string };
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
  const images = imagesData?.data?.map(image => image.attributes.url) || [];

  return (
    <Container maxWidth={false} sx={styles.root}>
      <Box
        sx={{
          ...styles.productContainer,
          alignItems: { xs: 'center', md: 'flex-start' },
        }}
      >
        {images.length > 0 ? (
          <ImageSlider images={images} />
        ) : (
          <Paper sx={styles.noImagePaper}>
            <Image fill src="/icons/galleryIcon.svg" alt="no image" />
          </Paper>
        )}
      </Box>
      <Box sx={styles.productContainer}>
        <Box sx={styles.productName}>
          <Typography variant="h1">{name}</Typography>
          <Typography variant="h3">${price}</Typography>
        </Box>
        <Box sx={styles.genderAndColor}>
          {gender && (
            <Typography variant="h4" sx={styles.productLabel}>
              {gender}&apos;s Shoes
            </Typography>
          )}
          {color && (
            <Typography variant="h4" sx={styles.productLabel}>
              Color: {color?.data?.attributes.name}
            </Typography>
          )}
        </Box>
        <ActionButtons
          sizes={sizes}
          product={{ ...product?.data.attributes, id: Number(productId) }}
        />
        <Box sx={styles.descriptionContainer}>
          <Typography variant="h4" sx={styles.productLabel}>
            Description
          </Typography>
          <Typography variant="body3" sx={styles.productLabel}>
            {description}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Product;
