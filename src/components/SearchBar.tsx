import { useIsMobile } from "@/hooks";
import { constants } from "@/lib/constants";
import { Box, InputBase } from "@mui/material";
import { SearchNormal1 } from "iconsax-react";

type SearchBarProps = {
  width: string;
  height: string;
  value?: string;
  setValue?: (value: string) => void;
  focused?: boolean;
};

const SearchBar = ({
  width,
  height,
  value,
  setValue,
  focused = false,
}: SearchBarProps) => {
  const isMobile = useIsMobile();

  return (
    <Box
      sx={{
        position: "relative",
        marginInline: { xs: "0px 10px", sm: "20px", md: "40px" },
        width,
        height: { xs: "25px", sm: "40px", md: height },
      }}
    >
      <Box
        sx={{
          paddingLeft: { xs: "10px", sm: "18px", md: `calc(${height}/3)` },
          height: "100%",
          position: "absolute",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isMobile && (
          <SearchNormal1 size="10" color={constants.palette.grey[700]} />
        )}
        {!isMobile && (
          <SearchNormal1
            size={`calc(${height}/3)`}
            color={constants.palette.grey[700]}
          />
        )}
      </Box>
      <InputBase
        onFocus={(e) => {
          if (!focused) e.target.blur();
        }}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        value={value}
        onChange={(e) => {
          if (setValue) setValue(e.target.value);
        }}
        sx={{
          paddingLeft: { xs: "25px", sm: "35px", md: `${height}` },
          paddingRight: { xs: "10px", md: `calc(${height}/3)` },
          color: constants.palette.text.secondary,
          width: "100%",
          height: { xs: "25px", sm: "40px", md: height },
          border: `1px solid ${constants.palette.grey[700]}`,
          borderRadius: `calc(${height}/2)`,
          "& > input": {
            fontSize: { xs: "10px", sm: "18px", md: `calc(${height}/3)` },
          },
          "&::placeholder": {
            color: constants.palette.text.secondary,
            opacity: 0,
          },
        }}
        autoFocus={focused}
      />
    </Box>
  );
};

export default SearchBar;
