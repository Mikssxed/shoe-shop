"use client";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Bag, HambergerMenu, SearchNormal1 } from "iconsax-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useIsMobile } from "@/hooks";
import Search from "./Search";
import SearchInput from "./SearchInput";
import { ProfileSidebar } from "./common";

const Header = () => {
  const theme = useTheme();
  const { status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOn, setSearchOn] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <Search open={searchOn} handleClose={() => setSearchOn(false)} />
      <AppBar
        color="inherit"
        sx={{
          //TODO: change to theme value
          height: { xs: "64px", md: "120px" },
          width: "100%",
          position: "sticky",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            flexGrow: 1,
            paddingInline: { xs: "20px", md: "40px" },
            backgroundcolor: theme.palette.background.default,
            justifyItems: "end",
            gap: { xs: "20px", md: 0 },
          }}
        >
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <Image alt="logo" width="40" height="30" src="/icons/logo.png" />
            <Link style={{ textDecoration: "none" }} href="/products">
              <Typography
                align="center"
                sx={{
                  marginInline: { xs: "12px", sm: "44px" },
                  lineHeight: "30px",
                }}
                variant="body1"
              >
                Products
              </Typography>
            </Link>
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
                  display: { xs: "none", md: "inline" },
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
            display={{ xs: "none", md: "block" }}
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
              md: "none",
            }}
            onClick={() => setSearchOn(true)}
          >
            <SearchNormal1 size="17" color="#494949" />
          </Box>
          {status === "authenticated" && (
            <Box
              sx={{
                marginLeft: { md: "16px" },
                marginRight: { md: "20px" },
              }}
              display={{
                xs: "none",
                md: "block",
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
              md: "none",
            }}
          >
            <HambergerMenu
              size="24"
              color="#494949"
              onClick={() => setSidebarOpen(true)}
            />
          </Box>
        </Toolbar>
        <Divider />
      </AppBar>
      {isMobile && (
        <ProfileSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
