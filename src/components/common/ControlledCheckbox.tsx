'use client';

import { Checkbox, FormControlLabel } from '@mui/material';
import { Controller } from 'react-hook-form';

interface IControlledInputProps {
  name: string;
  control: any;
  label: string;
}

const ControlledCheckbox = ({
  name,
  control,
  label,
}: IControlledInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControlLabel
          control={
            <Checkbox
              sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }}
              value={value}
              onChange={onChange}
              inputProps={
                {
                  'data-testid': `${label}-checkbox`,
                } as React.InputHTMLAttributes<HTMLInputElement>
              }
            />
          }
          label={label}
          sx={{ fontSize: '15px' }}
        />
      )}
    />
  );
};

export default ControlledCheckbox;
