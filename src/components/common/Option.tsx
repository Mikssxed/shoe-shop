import { stylingConstants } from '@/lib/constants/themeConstants';
import { Box, Checkbox, InputLabel } from '@mui/material';
import { ChangeEvent, useId } from 'react';

type OptionProps = {
  value: string | number;
  checked?: boolean;
  onAddFilter: () => void;
  onRemoveFilter: () => void;
};

export const Option = ({
  value,
  checked,
  onAddFilter,
  onRemoveFilter,
}: OptionProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) onAddFilter();
    if (!e.target.checked) onRemoveFilter();
  };

  const id = useId();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        color: stylingConstants.palette.text.primary,
        '& .MuiCheckbox-root, & .MuiInputLabel-root': {
          color: 'inherit',
        },
      }}
    >
      <Checkbox
        size="small"
        color="primary"
        id={id}
        sx={{
          ml: -1,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
        checked={checked}
        onChange={handleChange}
      />
      <InputLabel htmlFor={id} sx={{ mb: 0 }}>
        {value}
      </InputLabel>
    </Box>
  );
};
