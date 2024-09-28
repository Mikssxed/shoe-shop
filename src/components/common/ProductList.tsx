'use client';

import { Grid } from '@mui/material';
import { User } from 'next-auth';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { useIsMobile } from '@/hooks';
import { ProductsResponse } from '@/lib/types';
import { useProducts } from '@/tools';
import { buildParams } from '@/utils';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import EmptyProductList from './EmptyProductList';

type Props = {
  fullWidth?: boolean;
  initialProducts: ProductsResponse;
  user?: User;
};

const ProductList = ({ fullWidth, initialProducts, user }: Props) => {
  const isMobile = useIsMobile();
  const isFullWidth = fullWidth || isMobile;
  const searchParams = useSearchParams();

  const {
    data: products,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useProducts(initialProducts, buildParams(searchParams), user);
  const bottomElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        });
      },
      { threshold: 1 },
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
      columns={{ xs: 12, md: 12, lg: 12, xl: isFullWidth ? 8 : 12 }}
      sx={{ position: 'relative' }}
    >
      {isLoading &&
        new Array(8).fill(0).map((_, index) => (
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
      {products && products?.length <= 0 && (
        <Grid item xs={12} display="flex" justifyContent="center" marginY={5}>
          {user ? (
            <EmptyProductList
              text={`You don't have any products yet`}
              subtext={'Add new product'}
            />
          ) : (
            <EmptyProductList
              text={`We couldn't find any products`}
              subtext={
                'Try adjusting your search or filter to find what you want'
              }
            />
          )}
        </Grid>
      )}
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
              user={user}
            />
          </Grid>
        ))}
      <div ref={bottomElementRef} />
    </Grid>
  );
};
export default ProductList;
