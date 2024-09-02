"use client";

import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import notFoundImage from "@/../public/images/not_found.png";
import { useIsMobile } from "@/hooks";
import Header from "../Header";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFoundError = () => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const router = useRouter();

  const Buttons = () => {
    return (
      <>
        <Button variant="outlined" onClick={() => router.back()}>
          Go back
        </Button>
        <Link href="/">
          <Button sx={{ width: "100%" }} variant="contained">
            Home
          </Button>
        </Link>
      </>
    );
  };

  return (
    <Box sx={{ md: "100dvh" }}>
      {!isMobile && <Header />}
      <Grid
        container
        rowSpacing={{ xs: 4, md: 0 }}
        columns={{ xs: 1, md: 2 }}
        sx={{
          justifyContent: "center",
          width: "100%",
          height: { xs: "100%", md: "calc(100vh - 120px)" }, //TODO: replace 120px with theme value
          marginTop: { xs: 0 },
          marginBottom: { xs: "44px", md: 0 },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: "200px",
            backgroundColor: "#E5E5E7",
            zIndex: 0,
          }}
          display={{ md: "none" }}
        ></Box>
        <Grid
          item
          xs={1}
          sx={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "12px",
            marginInline: { xs: "28px", md: 0 },
            paddingInline: { xs: 0, md: "10%" },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: theme.palette.text.primary,
              textAlign: { xs: "center", md: "left" },
              fontSize: { xs: "30px", md: "45px" },
            }}
          >
            Error 404
          </Typography>
          <Typography
            variant="body2"
            sx={{
              paddingBottom: "16px",
              color: theme.palette.text.secondary,
              textAlign: { xs: "center", md: "left" },
              fontSize: { xs: "12px", md: "20px" },
            }}
          >
            Lorem Ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna
          </Typography>
          {!isMobile && (
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                "& > *": { width: "152px" },
              }}
            >
              <Buttons />
            </Grid>
          )}
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            position: "relative",
            aspectRatio: { xs: 1, md: "auto" },
            borderRadius: { xs: "0 0 39px 39px", md: 0 },
            backgroundImage: `url(${notFoundImage.src})`,
            backgroundSize: { xs: "110%", md: "cover", lg: "100% 100%" },
            height: "100%",
            backgroundRepeat: { xs: "no-repeat" },
            backgroundPosition: "center center",
          }}
        ></Grid>
        {isMobile && (
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              width: "100%",
              minHeight: "40px",
              marginX: "20px",
              marginTop: { xs: "auto", md: 0 },
              "& > *": { flexGrow: 1 },
            }}
          >
            <Buttons />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default NotFoundError;
