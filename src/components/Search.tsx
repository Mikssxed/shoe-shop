"use client";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import {
  Backdrop,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SearchInput from "./SearchInput";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useRef, useState } from "react";

type SearchProps = {
  open: boolean;
  handleClose: () => void;
};

/*TODO: Delete dummy data and fill in the list of proposed items with matching searches*/
const dummyData = [
  "Nike Air Force 1 LV8",
  "Nike Force 1",
  "Nike Air Force 1 '07 High",
  "Nike Air '07 High",
  "Nike Air Force 1 '07 High",
];

export default function Search({ open, handleClose }: SearchProps) {
  const boxRef = useRef<any>(null);

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.up("xs"));
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));

  const [searchValue, setSearchValue] = useState("");
  const searchTerms = dummyData.filter((item) =>
    item.toLowerCase().includes(searchValue)
  );

  const onClose = () => {
    setSearchValue("");
    handleClose();
  };

  return (
    <Backdrop
      sx={{
        backgroundColor: "#F3F3F3",
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
      onClick={(e) => {
        if (e.target !== boxRef.current && !boxRef.current.contains(e.target)) {
          onClose();
        }
      }}
    >
      <Box
        sx={{
          alignSelf: "start",
          padding: { xs: "20px 25px", sm: "40px 45px" },
          width: "100%",
          height: { xs: "200px", sm: "420px" },
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
        }}
        ref={boxRef}
      >
        <Box display={{ xs: "none", sm: "block" }}>
          <Image alt="logo" width="40" height="30" src="/icons/logo.png" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {open && (
            <>
              <SearchInput
                width="clamp(250px, 70dvw, 1070px)"
                height="80px"
                value={searchValue}
                setValue={(value) => {
                  setSearchValue(value);
                }}
                focused={true}
              />

              {searchValue && (
                <>
                  {searchTerms.length > 0 && (
                    <Typography
                      sx={{
                        marginTop: { xs: "12px", sm: "32px" },
                        marginInline: { xs: "0px 10px", sm: "40px" },
                        paddingLeft: "8px",
                        color: "#5C5C5C",
                        fontSize: { xs: "14px", sm: "20px" },
                      }}
                    >
                      Popular Search Terms
                    </Typography>
                  )}
                  <List
                    sx={{
                      padding: 0,
                      marginInline: { xs: "0px 10px", sm: "40px" },
                      display: "flex",
                      flexDirection: "column",
                      overflow: "auto",
                    }}
                  >
                    {searchTerms.map((data, index) => (
                      /*TODO: Add onClick to item to search the proposed item*/
                      <ListItemButton
                        key={index}
                        sx={{
                          paddingX: "8px",
                          paddingY: { xs: "4px", sm: "8px" },
                        }}
                      >
                        <ListItemText
                          primary={data}
                          primaryTypographyProps={{
                            color: "#000",
                            fontSize: { xs: "12px", sm: "22px" },
                            fontWeight: "600",
                          }}
                          sx={{
                            paddingY: "4px",
                            marginY: { xs: 0, sm: "4px" },
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </>
              )}
            </>
          )}
        </Box>
        <IconButton
          sx={{
            width: { xs: "20px", sm: "60px" },
            marginTop: { xs: "4px", sm: "10px" },
            height: { xs: "20px", sm: "60px" },
          }}
          onClick={onClose}
        >
          {matchesXs && !matchesSm && (
            <CloseIcon fontSize="small" color="disabled" />
          )}
          {matchesSm && <CloseIcon fontSize="large" color="disabled" />}
        </IconButton>
      </Box>
    </Backdrop>
  );
}
