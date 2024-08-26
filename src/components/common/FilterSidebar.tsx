import { FiltersData } from "@/app/types";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { BaseSidebar } from "../ui";
import { Category } from "./Category";
import PriceSlider from "./PriceSlider";
import Cross from "/public/icons/cross.svg";

type Props = {
  open: boolean;
  isMobile: boolean;
  searchingString: string;
  productsCount: number;
  filtersData: FiltersData;
  onClose: () => void;
};

export const FilterSidebar = ({
  open,
  isMobile,
  searchingString,
  productsCount,
  filtersData,
  onClose,
}: Props) => {
  const theme = useTheme();

  const { genders, colors, brands, categories, sizes } = filtersData;

  const handleClearFilters = () => {
    //TODO: implement clear filters
  };

  const categoryData = [
    { name: "Gender", options: genders },
    { name: "Color", options: colors },
    { name: "Brand", options: brands },
    { name: "Categories", options: categories },
    { name: "Sizes", options: sizes },
  ];

  const Content = () => {
    return (
      <>
        <Stack
          sx={{
            flexDirection: { xs: "row-reverse", md: "column" },
            justifyContent: "space-between",
            gap: 3,
            backgroundColor: "background.paper",
            padding: "15px",
          }}
        >
          {isMobile ? (
            <IconButton onClick={onClose} sx={{ display: { md: "none" } }}>
              <Image
                src={Cross}
                alt=""
                width={20}
                height={20}
                style={{
                  filter:
                    theme.palette.mode === "dark"
                      ? "brightness(10)"
                      : "brightness(1)",
                }}
              />
            </IconButton>
          ) : (
            <Box>
              <Typography>
                {searchingString
                  ? `Searching results for: ${searchingString}`
                  : "Shoes"}
              </Typography>
              <Typography>
                {searchingString && `Products found - ${productsCount}`}
              </Typography>
            </Box>
          )}
          <Button onClick={handleClearFilters} variant="outlined">
            Clear filters
          </Button>
        </Stack>

        {/* Categories */}
        {categoryData.map(({ name, options }) => (
          <Category
            key={name}
            name={name}
            options={options?.map(({ id, name }) => ({
              id,
              value: name,
            }))}
          />
        ))}
        <Category name="Price">
          <PriceSlider />
        </Category>
      </>
    );
  };

  return (
    <>
      <BaseSidebar
        isMobile={isMobile}
        open={open}
        containerStyle={{ padding: "24px 0px" }}
        onClose={onClose}
      >
        <Content />
      </BaseSidebar>
    </>
  );
};
