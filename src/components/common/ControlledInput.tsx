import { ComponentProps } from 'react';
import { Controller } from 'react-hook-form';
import { Box, SxProps, Theme } from '@mui/material';

import { Input } from '@/components/ui';

interface IControlledInputProps {
  name: string;
  control: any;
  label: string;
  required?: boolean;
  placeholder: string;
  inputStyle?: SxProps<Theme>;
  type?: 'password' | 'number';
  containerProps?: ComponentProps<typeof Box>;
}

const ControlledInput = ({
  name,
  control,
  label,
  required = false,
  placeholder,
  inputStyle,
  type,
  containerProps,
}: IControlledInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <Input
            required={required}
            label={label}
            inputProps={{ value, onChange, placeholder, type }}
            errorMessage={error ? error?.message : undefined}
            inputStyle={inputStyle}
            containerProps={containerProps}
          />
        </>
      )}
    />
  );
};

export default ControlledInput;
