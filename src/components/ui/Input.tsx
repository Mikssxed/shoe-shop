'use client';

import {
  Box,
  InputBase,
  InputBaseProps,
  InputLabel,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { ComponentProps, useId } from 'react';

import ErrorMessage from './ErrorMessage';

type InputProps = InputBaseProps & {
  label: string;
  required?: boolean;
  labelProps?: ComponentProps<typeof InputLabel>;
  containerProps?: ComponentProps<typeof Box>;
  inputStyle?: SxProps<Theme>;
  errorMessage?: string;
};

const Input = ({
  label,
  required,
  containerProps,
  labelProps,
  errorMessage,
  inputStyle,
  ...props
}: InputProps) => {
  const id = useId();
  const theme = useTheme();

  return (
    <Box {...containerProps}>
      <InputLabel htmlFor={id} {...labelProps}>
        {label}
        {required && (
          <Typography
            ml="5px"
            component="span"
            color={theme.palette.error.main}
          >
            *
          </Typography>
        )}
      </InputLabel>
      <InputBase
        data-testid={label}
        sx={{
          width: '100%',
          maxWidth: '436px',
          borderRadius: '8px',
          p: { xs: '8px 16px', md: '12px 16px' },
          mt: '8px',
          border: !!errorMessage
            ? `1px solid ${theme.palette.error.main}`
            : `1px solid ${theme.palette.grey[700]}`,
          '& .MuiInputBase-input': {
            [theme.breakpoints.down('md')]: {
              fontSize: '10px',
            },
          },
          ...inputStyle,
        }}
        {...props}
        id={id}
      />
      {errorMessage && (
        <ErrorMessage errorMessage={errorMessage} label={label} />
      )}
    </Box>
  );
};

export default Input;
