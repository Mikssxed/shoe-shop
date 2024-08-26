"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, InputLabel, MenuItem, Select, useTheme } from "@mui/material";
import { SelectProps } from "@mui/material/Select/Select";
import { useId } from "react";

type DropdownProps = SelectProps & {
  labelText?: string;
  options?: { value: number | string; name: string }[];
  withoutNone?: boolean;
};

const Dropdown = ({
  labelText,
  options = [],
  withoutNone = false,
  ...props
}: DropdownProps) => {
  const id = useId();
  const theme = useTheme();
  return (
    <Box sx={{ width: "100%", maxWidth: "250px" }}>
      {labelText && <InputLabel htmlFor={id}>{labelText}</InputLabel>}
      <Select
        id={id}
        sx={{
          width: "100%",
          borderRadius: "8px",
          maxHeight: "48px",
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.grey[700]}`,
        }}
        MenuProps={{ sx: { maxHeight: 400 } }}
        IconComponent={ExpandMoreIcon}
        {...props}
      >
        {!withoutNone && (
          <MenuItem
            sx={{
              fontSize: theme.typography.subtitle2,
              color: theme.palette.text.primary,
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
              fontSize: theme.typography.subtitle2,
              color: theme.palette.text.primary,
            }}
            key={value}
            value={value}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default Dropdown;
