import { Slider } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PriceSlider = ({ maxPrice: productMaxPrice }: { maxPrice: number }) => {
  const [priceRange, setPriceRange] = useState([-1, -1]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice && maxPrice) {
      setPriceRange([Number(minPrice), Number(maxPrice)]);
    } else {
      setPriceRange([0, productMaxPrice]);
    }
  }, [searchParams, productMaxPrice]);

  const handlePriceSelected = () => {
    const params = new URLSearchParams(searchParams);
    params.set("minPrice", String(priceRange[0]));
    params.set("maxPrice", String(priceRange[1]));
    router.push(`${pathname}?${params}`);
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
        mt: "25px",
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
          p: 0,
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
