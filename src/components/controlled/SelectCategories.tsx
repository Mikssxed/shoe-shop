'use client';

import {
  Autocomplete,
  Chip,
  InputLabel,
  TextField,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Controller } from 'react-hook-form';

import { stylingConstants } from '@/lib/constants/themeConstants';
import { ICategoriesSelectProps } from '@/lib/types';
import ErrorMessage from '../ui/ErrorMessage';
import RequiredStar from '../ui/RequiredStar';

const SelectCategories = ({
  control,
  name,
  filtersData,
  label,
  required = true,
}: ICategoriesSelectProps) => {
  const theme = useTheme();

  return (
    <>
      {label && (
        <InputLabel htmlFor={name}>
          {label}
          {required && <RequiredStar />}
        </InputLabel>
      )}
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
                      sx={{
                        height: { xs: '28px', md: '32px' },
                        '& .MuiChip-label': {
                          [theme.breakpoints.down('md')]: {
                            fontSize: '10px',
                          },
                        },
                      }}
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
                  '.MuiOutlinedInput-notchedOutline': { border: 0 },
                  border: !!error
                    ? `1px solid ${stylingConstants.palette.error.main}`
                    : `1px solid ${stylingConstants.palette.grey[700]}`,
                  '& .MuiOutlinedInput-root': {
                    height: { xs: '34px', md: '48px' },
                    py: 0,
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none',
                    },
                  },
                  '& .MuiAutocomplete-hasClearIcon': {
                    py: { xs: '6.5px', md: '5px' },
                  },
                }}
              />
            )}
            {error && (
              <ErrorMessage
                errorMessage={error?.message}
                label={'categories-select'}
              />
            )}
          </>
        )}
      />
    </>
  );
};

export default SelectCategories;
