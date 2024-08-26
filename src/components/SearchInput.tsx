import { VoiceChatRounded } from "@mui/icons-material";
import { Box, InputBase, useMediaQuery, useTheme } from "@mui/material";
import { SearchNormal1 } from "iconsax-react";

type SearchInputProps = {
  width: string;
  height: string;
  value?: string;
  setValue?: (value: string) => void;
  focused?: boolean;
};

const SearchInput = ({
  width,
  height,
  value,
  setValue,
  focused = false,
}: SearchInputProps) => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.up("xs"));
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box
      sx={{
        position: "relative",
        marginInline: { xs: "0px 10px", sm: "20px", md: "40px" },
        width: { width },
        height: { xs: "25px", sm: height },
      }}
    >
      <Box
        sx={{
          paddingLeft: { xs: "10px", sm: `calc(${height}/3)` },
          height: "100%",
          position: "absolute",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {matchesXs && !matchesSm && <SearchNormal1 size="10" color="#494949" />}
        {matchesSm && (
          <SearchNormal1 size={`calc(${height}/3)`} color="#494949" />
        )}
      </Box>
      <InputBase
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        value={value}
        onChange={(e) => {
          if (setValue) setValue(e.target.value);
        }}
        sx={{
          paddingTop: "2px",
          paddingLeft: { xs: "25px", sm: height },
          paddingRight: { xs: "10px", sm: `calc(${height}/3)` },
          color: "#5C5C5C",
          width: "100%",
          height: { xs: "25px", sm: height },
          border: "1px solid #494949",
          borderRadius: `calc(${height}/2)`,
          fontSize: { xs: "10px", sm: `calc(${height}/3)` },
        }}
        autoFocus={focused}
      />
    </Box>
  );
};

export default SearchInput;
