'use client';

import { Grid, Skeleton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { enqueueSnackbar } from 'notistack';

import ProductCardSkeleton from './ProductCardSkeleton';
import ProductCard from './ProductCard';
import EmptyProductList from './EmptyProductList';
import { IStoredProductsProp } from '@/lib/types';
import { toggleWishlistedProductId } from '@/utils';

export default function StoredProducts({
  products: fetchedProducts,
  isLoading,
  title,
  emptyStateText,
}: IStoredProductsProp) {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState(fetchedProducts);

  useEffect(() => {
    if (fetchedProducts) {
      setProducts(fetchedProducts);
    }
  }, [fetchedProducts]);

  const handleRemoveFromWishlist = (productId: string) => {
    toggleWishlistedProductId(productId, session?.user?.id);

    setProducts(prevProducts =>
      prevProducts?.filter(product => product.id.toString() !== productId),
    );
    enqueueSnackbar('Successfully removed from wishlist', {
      variant: 'success',
      autoHideDuration: 2000,
    });
  };

  return (
    <Stack
      justifyContent="center"
      sx={{ maxWidth: 1850, mx: 'auto', px: '20px', py: { xs: '24px', md: 0 } }}
    >
      {isLoading || status === 'loading' ? (
        <Skeleton
          variant="text"
          width="20%"
          height="53px"
          data-testid="title__skeleton"
        />
      ) : (
        <Typography sx={{ marginBottom: '24px' }} variant="h1">
          {title}
        </Typography>
      )}

      <Grid
        container
        spacing={{ xs: 2, sm: 5, lg: 6, xl: 8 }}
        columns={12}
        sx={{ position: 'relative', marginBottom: '24px' }}
      >
        {(isLoading || status === 'loading') &&
          new Array(12).fill(0).map((_, index) => (
            <Grid
              key={index}
              item
              xs={6}
              md={6}
              lg={4}
              xl={3}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                transition: 'all 0.3s ease-in-out',
              }}
              data-testid="product__skeleton"
            >
              <ProductCardSkeleton />
            </Grid>
          ))}
        {products && products?.length === 0 && (
          <Grid item xs={12} display="flex" justifyContent="center" marginY={5}>
            <EmptyProductList
              text={emptyStateText}
              buttonText="Explore"
              link="/products"
            />
          </Grid>
        )}
        {products &&
          products.map((product, index) => (
            <Grid
              key={product.id}
              item
              xs={6}
              md={6}
              lg={4}
              xl={3}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <ProductCard
                imagePriority={index === 0}
                product={{ ...product.attributes, id: product.id }}
                handleWishlist={handleRemoveFromWishlist}
              />
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
}
