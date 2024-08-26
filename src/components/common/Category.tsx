import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { Option } from "./Option";

type CategoryProps = {
  name: string;
  children?: ReactNode;
  options?: {
    id: number;
    value: string | number;
  }[];
};

export const Category = ({ name, children, options }: CategoryProps) => {
  const updateFilter = (option: string | number, action: "add" | "remove") => {
    // TODO: implement filter update
  };

  const handleAddFilter = (option: string | number) => {
    updateFilter(option, "add");
  };

  const handleRemoveFilter = (option: string | number) => {
    updateFilter(option, "remove");
  };

  return (
    <>
      <Divider />
      <Accordion
        defaultExpanded
        disableGutters
        sx={{
          padding: {
            xs: "15px 10px 15px 40px",
            md: "15px 10px 15px 15px",
          },
          backgroundImage: "none",
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
          "& .MuiAccordionSummary-expandIconWrapper": {
            color: "text.primary",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ paddingLeft: 0 }}
        >
          <Typography>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ paddingLeft: 0 }}>
          {children}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {options?.map(({ id, value }) => (
              <Option
                key={id}
                value={value}
                checked={false}
                onAddFilter={() => handleAddFilter!(value)}
                onRemoveFilter={() => handleRemoveFilter!(value)}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
