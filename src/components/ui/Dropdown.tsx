'use client';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectProps } from '@mui/material/Select/Select';
import { useId } from 'react';

import { stylingConstants } from '@/lib/constants/themeConstants';
import ErrorMessage from './ErrorMessage';
import RequiredStar from './RequiredStar';

type DropdownProps = SelectProps & {
  labelText?: string;
  options?: { value: number | string; name: string }[];
  withoutNone?: boolean;
  errorMessage?: string;
};

const Dropdown = ({
  labelText,
  options = [],
  withoutNone = false,
  errorMessage,
  ...props
}: DropdownProps) => {
  const id = useId();
  return (
    <Box sx={{ width: '100%', maxWidth: '436px' }}>
      {labelText && (
        <InputLabel htmlFor={id}>
          {labelText}
          <RequiredStar />
        </InputLabel>
      )}
      <Select
        id={id}
        sx={{
          width: '100%',
          borderRadius: '8px',
          maxHeight: '48px',
          color: stylingConstants.palette.text.primary,
          border: `1px solid ${
            errorMessage
              ? stylingConstants.palette.error.main
              : stylingConstants.palette.grey[700]
          }`,
          my: '3px',
        }}
        MenuProps={{ sx: { maxHeight: 400 }, disableScrollLock: true }}
        IconComponent={ExpandMoreIcon}
        {...props}
        defaultValue={options.map(elem => elem.value).includes(0) ? 0 : ''}
      >
        {!withoutNone && (
          <MenuItem
            sx={{
              fontSize: 15,
              color: stylingConstants.palette.text.primary,
            }}
            key="none"
            value={0}
          >
            None
          </MenuItem>
        )}
        {options.map(({ value, name }) => (
          <MenuItem
            sx={{
              fontSize: 15,
              color: stylingConstants.palette.text.primary,
            }}
            key={value}
            value={value}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
      {errorMessage && (
        <ErrorMessage errorMessage={errorMessage} label={labelText || ''} />
      )}
    </Box>
  );
};

export default Dropdown;
