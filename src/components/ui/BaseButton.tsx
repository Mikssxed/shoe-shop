import {
  Button,
  ButtonBaseProps,
  ButtonOwnProps,
  SxProps,
  Theme,
} from '@mui/material';
import React from 'react';

interface IBaseButtonProps extends ButtonBaseProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  variant?: ButtonOwnProps['variant'];
  color?: ButtonOwnProps['color'];
  dataTestId?: string;
}

const BaseButton = ({
  children,
  sx,
  color,
  variant = 'contained',
  dataTestId = 'button',
  ...props
}: IBaseButtonProps) => {
  return (
    <Button
      data-testid={dataTestId}
      variant={variant}
      color={color}
      sx={sx}
      {...props}
    >
      {children}
    </Button>
  );
};

export default BaseButton;
