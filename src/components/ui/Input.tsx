"use client";
import { inter } from "@/lib/constants";
import {
  Box,
  InputBase,
  InputBaseProps,
  InputLabel,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { ComponentProps, useId } from "react";

type InputProps = InputBaseProps & {
  label: string;
  required?: boolean;
  labelProps?: ComponentProps<typeof InputLabel>;
  containerProps?: ComponentProps<typeof Box>;
  inputStyle?: SxProps<Theme>,
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
            sx={{
              marginLeft: "5px",
            }}
            component="span"
            color={theme.palette.error.main}
          >
            *
          </Typography>
        )}
      </InputLabel>
      <InputBase
        sx={{
          width: "100%",
          maxWidth: "436px",
          borderRadius: "8px",
          padding: "8px 15px",
          marginY: "3px",
          border: !!errorMessage
            ? `1px solid ${theme.palette.error.main}`
            : `1px solid ${theme.palette.grey[700]}`,
            "& .MuiInputBase-input": {
              [theme.breakpoints.down("sm")]: {
                fontSize: "10px",
            },
          },
          ...inputStyle,
        }}
        {...props}
        id={id}
      />
      {errorMessage && (
        <Box
          sx={{
            color: theme.palette.error.main,
            display: "flex",
            gap: "4px",
            alignItems: "center",
          }}
        >
          <Image
            src={"/icons/warningIcon.svg"}
            alt="warning"
            width={15}
            height={13}
          />
          <Typography
            component="p"
            color={theme.palette.error.main}
            sx={{
              margin: 0,
              fontSize: theme.typography.body2,
              fontFamily: inter.style.fontFamily,
            }}
          >
            {errorMessage}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Input;
