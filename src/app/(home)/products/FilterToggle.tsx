'use client';

import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { FilterRemove, FilterSearch } from 'iconsax-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FilterSidebar, ProductList } from '@/components/common';
import LastViewedProducts from '@/components/common/LastViewedProducts';
import { useIsMobile } from '@/hooks';
import { stylingConstants } from '@/lib/constants/themeConstants';
import { FiltersData, ProductsResponse } from '@/lib/types';
import { textOverflowEllipsis } from '@/styles/commonStyles';

type Props = {
  filtersData: FiltersData;
  initialProducts: ProductsResponse;
  maxPrice: number;
};

function FilterToggle({ filtersData, initialProducts, maxPrice }: Props) {
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isMobile) {
      setShowFilters(false);
      return;
    }
  }, [isMobile]);

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };
  return (
    <>
      {filtersData && (
        <FilterSidebar
          onClose={() => setShowFilters(false)}
          isMobile={isMobile}
          open={showFilters}
          searchingString={''}
          productsCount={0}
          filtersData={filtersData}
          maxPrice={maxPrice}
        />
      )}
      <Box sx={{ p: { xs: 0, lg: '0 40px' }, mt: 3, width: '100%' }}>
        {!searchParams.has('search') && (
          <LastViewedProducts isFullWidth={!showFilters} />
        )}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
            width: '100%',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              width: {
                xs: 'calc(100vw - 100px)',
                sm: 'calc(100vw - 130px)',
                md: 'calc(100vw - 540px)',
                lg: 'calc(100vw - 588px)',
              },
              maxWidth: '1080px',
            }}
          >
            {searchParams.has('search') ? (
              <>
                Search Results:
                {searchParams.get('search') !== '' && (
                  <>
                    <br />
                    <Tooltip
                      title={searchParams.get('search') || ''}
                      placement="top-end"
                    >
                      <Box
                        component="span"
                        sx={{
                          ...textOverflowEllipsis.singleLine,
                          maxWidth: '90%',
                        }}
                      >
                        {`"${searchParams.get('search')}"`}
                      </Box>
                    </Tooltip>
                  </>
                )}
              </>
            ) : (
              'Available products'
            )}
          </Typography>
          <IconButton
            onClick={handleShowFilters}
            sx={{
              fontSize: {
                xs: '15px',
                md: '24px',
                position: 'relative',
                zIndex: 1,
              },
            }}
          >
            {isMobile
              ? 'Filters'
              : showFilters
                ? 'Hide Filters'
                : 'Show Filters'}
            {showFilters ? (
              <FilterRemove color={stylingConstants.palette.text.secondary} />
            ) : (
              <FilterSearch color={stylingConstants.palette.text.secondary} />
            )}
          </IconButton>
        </Box>
        <ProductList
          initialProducts={initialProducts}
          fullWidth={!showFilters}
        />
      </Box>
    </>
  );
}

export default FilterToggle;
