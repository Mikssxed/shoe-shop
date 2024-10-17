'use client';
import {
  Box,
  Grid,
  Skeleton,
  Typography,
  Link as MUILink,
} from '@mui/material';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { useStored } from '@/tools';
import { getStoredProductIds } from '@/utils';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import { stylingConstants } from '@/lib/constants/themeConstants';

type Props = {
  isFullWidth: boolean;
};

function LastViewedProducts({ isFullWidth }: Props) {
  const { data: session, status } = useSession();
  const productIds = getStoredProductIds('lastViewed', session?.user?.id);
  const { data: products, isLoading } = useStored('lastViewed', productIds, 4);

  if (!products?.length && !isLoading) {
    return null;
  }

  return (
    <>
      {isLoading ? (
        <Skeleton variant="text" width="20%" height="53px" />
      ) : (
        <Box
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-end', md: 'baseline' },
            mb: '24px',
          }}
        >
          <Typography variant="h1" sx={{ m: 0 }}>
            Last viewed products
          </Typography>
          {status === 'authenticated' && (
            <MUILink
              component={Link}
              href={'/profile/recently-viewed'}
              sx={{
                flexShrink: 0,
                fontSize: { xs: '1rem', sm: '1.25rem' },
                lineHeight: '35px',
                mb: { xs: '-3px', md: 0 },
                color: stylingConstants.palette.text.primary,
                textDecorationColor: stylingConstants.palette.text.primary,
                position: 'relative',
                zIndex: 2,
              }}
            >
              See All
            </MUILink>
          )}
        </Box>
      )}

      <Grid
        container
        spacing={{ xs: 2, sm: 5, lg: 6, xl: 8 }}
        columns={{ xs: 12, md: 12, lg: 12, xl: isFullWidth ? 8 : 12 }}
        sx={{ position: 'relative', marginBottom: '24px' }}
      >
        {isLoading &&
          new Array(4).fill(0).map((_, index) => (
            <Grid
              key={index}
              item
              xs={6}
              md={isFullWidth ? 4 : 6}
              lg={isFullWidth ? 3 : 4}
              xl={isFullWidth ? 2 : 3}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <ProductCardSkeleton />
            </Grid>
          ))}
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
                display: 'flex',
                justifyContent: 'center',
                transition: 'all 0.3s ease-in-out',
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
