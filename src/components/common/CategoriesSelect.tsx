'use client';

import { Autocomplete, Chip, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Controller } from 'react-hook-form';

import { stylingConstants } from '@/lib/constants/themeConstants';
import { ICategoriesSelectProps } from '@/lib/types';
import ErrorMessage from '../ui/ErrorMessage';

const CategoriesSelect = ({
  control,
  name,
  filtersData,
}: ICategoriesSelectProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          {filtersData && (
            <Autocomplete
              {...field}
              multiple
              options={filtersData.categories.data}
              getOptionLabel={category => category.attributes.name}
              popupIcon={<ExpandMoreIcon />}
              renderTags={(value, getTagProps) =>
                value.map((option, index: number) => (
                  <Chip
                    variant="outlined"
                    label={option.attributes.name}
                    {...getTagProps({ index })}
                    key={option.id}
                  />
                ))
              }
              onChange={(_, selectedOptions) =>
                field.onChange(selectedOptions.map(option => option.id))
              }
              value={filtersData.categories.data.filter(option =>
                field.value.includes(option.id),
              )}
              renderInput={params => <TextField {...params} id="cate" />}
              sx={{
                width: '100%',
                maxWidth: '436px',
                borderRadius: '8px',
                my: '3px',
                border: !!error
                  ? `1px solid ${stylingConstants.palette.error.main}`
                  : `1px solid ${stylingConstants.palette.grey[700]}`,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                },
              }}
            />
          )}
          {error && <ErrorMessage errorMessage={error?.message} />}
        </>
      )}
    />
  );
};

export default CategoriesSelect;
