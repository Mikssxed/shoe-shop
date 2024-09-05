"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Bag, HambergerMenu, SearchNormal1 } from "iconsax-react";
import {
  Toolbar,
  Box,
  Button,
  Typography,
  Avatar,
  useTheme,
  AppBar,
  Divider,
} from "@mui/material";

import Search from "./Search";
import SearchInput from "./SearchInput";

const Header = () => {
  const theme = useTheme();
  const { status } = useSession();

  const [searchOn, setSearchOn] = useState(false);

  return (
    <>
      <Search open={searchOn} handleClose={() => setSearchOn(false)} />
      <AppBar
        color="inherit"
        sx={{
          //TODO: change to theme value
          height: { xs: "64px", sm: "120px" },
          width: "100%",
          position: "sticky",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            flexGrow: 1,
            paddingInline: { xs: "20px", sm: "40px" },
            backgroundcolor: theme.palette.background.default,
            justifyItems: "end",
            gap: { xs: "20px", sm: 0 },
          }}
        >
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <Image alt="logo" width="40" height="30" src="/icons/logo.png" />
            <Typography
              align="center"
              sx={{ marginInline: "44px", lineHeight: "30px" }}
              variant="body1"
              display={{
                xs: "none",
                sm: "block",
              }}
            >
              Products
            </Typography>
          </Box>
          {status === "unauthenticated" && (
            <Link
              href="/auth/sign-in"
              style={{
                textDecoration: "none",
              }}
            >
              <Button
                sx={{
                  width: "min(145px, 14vw)",
                  height: "48px",
                  display: { xs: "none", sm: "inline" },
                  typography: {
                    textTransform: "none",
                    fontWeight: "700",
                  },
                }}
                variant="outlined"
                color="primary"
              >
                Sign in
              </Button>
            </Link>
          )}
          <Box
            display={{ xs: "none", sm: "block" }}
            onFocus={() => setSearchOn(true)}
          >
            <SearchInput width="min(320px, 25vw)" height="48px" />
          </Box>
          <Link href="/bag">
            <Bag size="24" color="#494949" />
          </Link>
          <Box
            display={{
              xs: "block",
              sm: "none",
            }}
            onClick={() => setSearchOn(true)}
          >
            <SearchNormal1 size="17" color="#494949" />
          </Box>
          {status === "authenticated" && (
            <Box
              sx={{
                marginLeft: { sm: "16px" },
                marginRight: { sm: "20px" },
              }}
              display={{
                xs: "none",
                sm: "block",
              }}
            >
              {/*TODO: Change to user picture and add onclick to route to user profile or menu*/}
              <Link href="/profile/my-products">
                <Avatar
                  alt="User avatar"
                  src="/images/avatar.png"
                  sx={{ width: 24, height: 24 }}
                />
              </Link>
            </Box>
          )}
          <Box
            display={{
              xs: "block",
              sm: "none",
            }}
          >
            {/*TODO: Add onclick to show sidebar */}
            <HambergerMenu size="24" color="#494949" />
          </Box>
        </Toolbar>
        <Divider />
      </AppBar>
    </>
  );
};

export default Header;
