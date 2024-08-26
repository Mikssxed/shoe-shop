"use client";
import {
  Box,
  InputBase,
  InputLabel,
  Typography,
  useTheme,
} from "@mui/material";
import { InputBaseProps } from "@mui/material/InputBase/InputBase";
import Image from "next/image";
import { useId } from "react";
import warningIcon from "/public/icons/warningIcon.svg";

type TextareaProps = InputBaseProps & {
  labelText: string;
  name: string;
  errorMessage?: string;
  required?: boolean;
};

const Textarea = ({
  labelText,
  name,
  errorMessage,
  required,
  ...props
}: TextareaProps) => {
  const id = useId();
  const theme = useTheme();
  return (
    <Box>
      <InputLabel htmlFor={id}>
        {labelText}
        {required && (
          <Typography
            component="span"
            sx={{ color: theme.palette.error.main, marginLeft: "5px" }}
          >
            *
          </Typography>
        )}
      </InputLabel>
      <InputBase
        sx={{
          borderRadius: "8px",
          borderColor: "grey.A400",
          padding: "8px 15px",
          "& .MuiInputBase-input": {
            color: theme.palette.text.primary,
          },
          border: !!errorMessage
            ? `2px solid ${theme.palette.error.main}`
            : `1px solid ${theme.palette.grey["700"]}`,
        }}
        id={id}
        fullWidth
        multiline
        inputProps={{ style: { overflowX: "hidden" } }}
        {...props}
        error={!!errorMessage}
      />
      {errorMessage && (
        <Box
          sx={{
            color: theme.palette.error.main,
            display: "flex",
            alignItems: "center",
            gap: "4px",
            marginTop: "8px",
          }}
        >
          <Image src={warningIcon} alt="" />
          {errorMessage}
        </Box>
      )}
    </Box>
  );
};

export default Textarea;
