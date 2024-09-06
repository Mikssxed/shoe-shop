"use client";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useIsMobile } from "@/hooks";
import Cross from "/public/icons/cross.svg";
import Modal from "./ui/Modal";
import { Block } from "@mui/icons-material";

type SearchProps = {
  open: boolean;
  onClose: () => void;
};

/*TODO: Delete dummy data and fill in the list of proposed items with matching searches*/
const dummyData = [
  "Nike Air Force 1 LV8",
  "Nike Force 1",
  "Nike Air Force 1 '07 High",
  "Nike Air '07 High",
  "Nike Air Force 1 '07 High",
];

export default function Search({ open, onClose }: SearchProps) {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const [searchValue, setSearchValue] = useState("");
  const searchTerms = dummyData.filter((item) =>
    item.toLowerCase().includes(searchValue)
  );

  const handleClose = () => {
    setSearchValue("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      keepMounted={true}
      containerStyle={{
        display: "block",
        "& > *": {
          alignItems: "flex-start",
        },
      }}
      paperStyle={{
        justifyContent: "start",
        width: "100%",
        maxWidth: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      <Box
        sx={{
          alignSelf: "start",
          padding: { xs: "20px 25px", sm: "30px 35px", md: "40px 45px" },
          width: "100%",
          height: { xs: "200px", sm: "300px", md: "420px" },
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {!isMobile && (
          <Image alt="logo" width="40" height="30" src="/icons/logo.png" />
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {open && (
            <>
              <SearchBar
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
                        marginTop: { xs: "12px", sm: "22px", md: "32px" },
                        marginInline: {
                          xs: "0px 10px",
                          sm: "20px",
                          md: "40px",
                        },
                        paddingLeft: "8px",
                        color: theme.palette.text.secondary,
                        fontSize: { xs: "14px", sm: "17px", md: "20px" },
                      }}
                    >
                      Popular Search Terms
                    </Typography>
                  )}
                  <List
                    sx={{
                      padding: 0,
                      marginInline: { xs: "0px 10px", sm: "20px", md: "40px" },
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
                          paddingY: { xs: "4px", sm: "6px", md: "8px" },
                        }}
                      >
                        <ListItemText
                          primary={data}
                          primaryTypographyProps={{
                            color: theme.palette.text.primary,
                            fontSize: { xs: "14px", sm: "17px", md: "20px" },
                          }}
                          sx={{
                            paddingY: "4px",
                            marginY: { xs: 0, sm: "2px", md: "4px" },
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
        <Box
          sx={{
            "& > img": {
              width: { xs: "10px", sm: "20px", md: "27px" },
              marginTop: { xs: "4px", sm: "7px", md: "10px" },
              height: { xs: "10px", sm: "20px", md: "27px" },
            },
          }}
        >
          <Image
            src={Cross}
            alt="close"
            width={27}
            height={27}
            onClick={handleClose}
            style={{
              filter:
                theme.palette.mode === "dark"
                  ? "brightness(10)"
                  : "brightness(1)",
              alignSelf: "start",
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>
    </Modal>
  );
}
