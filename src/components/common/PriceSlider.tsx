import { Slider } from "@mui/material";
import { useState } from "react";

const PriceSlider = () => {
  const [priceRange, setPriceRange] = useState([-1, -1]);
  const [productMaxPrice, setProductMaxPrice] = useState(1000);

  const handlePriceSelected = () => {
    //TODO: Add logic to filter products based on price range
  };

  return (
    <Slider
      max={productMaxPrice}
      value={priceRange}
      onChange={(_, value) => setPriceRange(value as number[])}
      onChangeCommitted={handlePriceSelected}
      valueLabelFormat={(value) => `$${value}`}
      valueLabelDisplay="auto"
      getAriaLabel={() => "Price range"}
      getAriaValueText={() => [priceRange[0], priceRange[1]].toString()}
      sx={{
        marginTop: "25px",
        "& .MuiSlider-track": {
          border: "none",
        },
        "& .MuiSlider-thumb": {
          height: 16,
          width: 16,
          backgroundColor: "#fff",
          border: "2px solid currentColor",
          "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
            boxShadow: "inherit",
          },
          "&:before": {
            display: "none",
          },
        },
        "& .MuiSlider-valueLabel": {
          lineHeight: 1.2,
          fontSize: 12,
          background: "unset",
          padding: 0,
          width: 40,
          height: 40,
          borderRadius: "50% 50% 50% 0",
          backgroundColor: "primary.main",
          transformOrigin: "bottom left",
          transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
          "&:before": { display: "none" },
          "&.MuiSlider-valueLabelOpen": {
            transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
          },
          "& > *": {
            transform: "rotate(45deg)",
          },
        },
        "& .MuiSlider-rail": {
          color: "grey.A200",
        },
      }}
    />
  );
};
export default PriceSlider;
