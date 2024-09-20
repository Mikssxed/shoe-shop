'use client';

import { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

import { addToCartQuery } from '@/tools';
import { actionButtonsStyles as styles } from '@/styles/product/product.style';
import { IActionButtonsProps } from '@/lib/types/props.type';

export default function ActionButtons({ sizes, product }: IActionButtonsProps) {
  const [selectedSize, setSelectedSize] = useState<number | undefined>();

  const onSelectSize = (value: number) => setSelectedSize(value);

  const addToBag = () => {
    addToCartQuery(product, selectedSize || 'unselected');
    enqueueSnackbar('Succesfully added to cart', {
      variant: 'success',
      autoHideDuration: 2000,
    });
  };

  const addToFav = () => {
    //TODO: add to fav logic
  };

  return (
    <>
      {sizes && sizes.length !== 0 && (
        <Box sx={{ mt: '10px', w: '100%' }}>
          <Typography variant="h4" sx={styles.productLabel}>
            Select Size
          </Typography>
          <Grid container spacing={2} sx={{ pt: '14px' }}>
            {sizes
              .sort((a, b) => +a.attributes.value - +b.attributes.value)
              .map(({ id, attributes: { value } }) => {
                const isChecked = +value === selectedSize;
                return (
                  <Grid key={id} xs={3} sm={2} md={3} lg={2} item>
                    <Button
                      sx={{
                        ...styles.sizeBtn,
                        color: isChecked ? 'white' : 'text.secondary',
                      }}
                      variant={isChecked ? 'contained' : 'outlined'}
                      onClick={() => onSelectSize(+value)}
                    >
                      EU-{value}
                    </Button>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      )}
      <Box sx={styles.addButtons}>
        <Button onClick={addToFav} variant="outlined" sx={styles.actionButton}>
          Favorite
        </Button>
        <Button onClick={addToBag} variant="contained" sx={styles.actionButton}>
          Add to Bag
        </Button>
      </Box>
    </>
  );
}
