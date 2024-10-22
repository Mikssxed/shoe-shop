'use client';

import { ComponentProps, forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import { Box, SxProps, Theme } from '@mui/material';

import { Input } from '@/components/ui';

interface IControlledInputProps {
  name: string;
  control: any;
  label: string;
  required?: boolean;
  disabled?: boolean;
  placeholder: string;
  inputStyle?: SxProps<Theme>;
  type?: 'password' | 'number';
  containerProps?: ComponentProps<typeof Box>;
}

const ControlledInput = forwardRef<HTMLInputElement, IControlledInputProps>(
  (
    {
      name,
      control,
      label,
      required = false,
      disabled = false,
      placeholder,
      inputStyle,
      type,
      containerProps,
    },
    ref,
  ) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            required={required}
            label={label}
            inputProps={{
              value,
              onChange,
              placeholder,
              type,
              'data-testid': `${label}-input`,
              ref,
            }}
            errorMessage={error ? error.message : undefined}
            inputStyle={inputStyle}
            containerProps={containerProps}
            disabled={disabled}
          />
        )}
      />
    );
  },
);

ControlledInput.displayName = 'ControlledInput';

export default ControlledInput;
