"use client";
import Image from "next/image";
import { Bag, HambergerMenu, SearchNormal1, User } from "iconsax-react";
import SearchInput from "./SearchInput";
import Search from "./Search";
import { Toolbar, Box, Button, Typography, Avatar } from "@mui/material";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  //TODO: When auth will be finished change how it's set
  const [auth, setAuth] = useState(false);
  const [searchOn, setSearchOn] = useState(false);

  //TODO: When auth page is finished route to signing page
  const handleSignIn = () => {
    setAuth(true);
  };

  return (
    <>
      <Search open={searchOn} handleClose={() => setSearchOn(false)} />
      <Toolbar
        sx={{
          paddingInline: { xs: "20px", sm: "40px" },
          height: { xs: "64px", sm: "120px" },
          justifyItems: "end",
          gap: { xs: "20px", sm: 0 },
        }}
      >
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Image alt="logo" width="40" height="30" src="/logo.png" />
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
        {!auth && (
          /*TODO: Change color when main colors will be set */
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
            onClick={handleSignIn}
            color="primary"
          >
            Sign in
          </Button>
        )}
        <Box
          display={{ xs: "none", sm: "block" }}
          onFocus={() => setSearchOn(true)}
        >
          <SearchInput width="min(320px, 25vw)" height="48px" />
        </Box>
        {/*TODO: Change link to the bag */}
        <Link href="/">
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
        {auth && (
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
            <Avatar
              alt="User avatar"
              src="/avatar.png"
              sx={{ width: 24, height: 24 }}
            />
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
    </>
  );
};

export default Header;
