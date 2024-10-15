'use client';

import { Button, Grid } from '@mui/material';
import { Controller } from 'react-hook-form';

import { stylingConstants } from '@/lib/constants/themeConstants';
import { productSizeButton } from '@/styles/products/productInfoFormStyles';
import ErrorMessage from '../ui/ErrorMessage';
import { ISizesSelectsProps } from '@/lib/types';

const SizesSelects = ({ name, control, filtersData }: ISizesSelectsProps) => {
  const sizes = filtersData?.sizes.data.map(elem => elem.id);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Grid container spacing={2}>
            {field?.value?.map((_: any, index: number) => (
              <Grid key={index + 'size'} xs={4} sm={3} xl={'auto'} item>
                <Button
                  sx={{
                    ...productSizeButton,
                    borderColor: `${
                      typeof sizes !== 'undefined'
                        ? field.value.includes(sizes[index])
                          ? stylingConstants.palette.error.main
                          : stylingConstants.palette.grey[700]
                        : stylingConstants.palette.grey[700]
                    }`,
                  }}
                  variant="outlined"
                  onClick={() => {
                    if (sizes) {
                      const newArray = field.value.map(
                        (value: number, i: number) =>
                          i === index ? (value === 0 ? sizes[i] : 0) : value,
                      );
                      field.onChange(newArray);
                    }
                  }}
                >
                  EU-
                  {filtersData?.sizes?.data[index]?.attributes?.value}
                </Button>
              </Grid>
            ))}
          </Grid>
          {error && (
            <ErrorMessage errorMessage={error?.message} label="Sizes" />
          )}
        </>
      )}
    />
  );
};

export default SizesSelects;
