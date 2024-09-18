import { Button, Grid, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { useIsMobile } from "@/hooks";
import {
  desktopButtonsStyles,
  errorMessageStyles,
  errorTitleStyles,
  mobileButtonsStyles,
} from "@/styles/errorPage/errorStyles";
import BaseErrorPage from "./BaseErrorPage";

const ServerError = ({ error, reset }: { error: Error; reset: () => void }) => {
  const isMobile = useIsMobile();
  const theme = useTheme();
  const Buttons = () => {
    return (
      <>
        <Button variant="outlined" onClick={reset}>
          Try again
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
    <BaseErrorPage>
      <Grid
        container
        sx={{
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "nowrap",
          justifyContent: { xs: "center", md: "start" },
          alignItems: "center",
          gap: theme.spacing(2),
          width: "100%",
          height: { xs: "100%", md: "calc(100vh - 120px)" }, //TODO: replace 120px with theme value
        }}
      >
        <Grid
          container
          sx={{
            position: "relative",
            zIndex: 2,
            justifyContent: { xs: "center", md: "start" },
            width: { md: "35%" },
            ml: { md: "15%" },
            gap: "20px",
          }}
        >
          <Typography variant="h1" sx={errorTitleStyles}>
            Something went wrong...
          </Typography>
          {!isMobile && (
            <>
              <Typography
                variant="body2"
                sx={{
                  ...errorMessageStyles,
                  maxHeight: "180px",
                  overflow: "auto",
                  pr: theme.spacing(),
                }}
              >
                {error.message}
              </Typography>
              <Grid item sx={desktopButtonsStyles}>
                <Buttons />
              </Grid>
            </>
          )}
        </Grid>
        <Grid
          item
          sx={{
            position: { xs: "relative", md: "absolute" },
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            height: { xs: "100%", md: "calc(100vh - 120px)" }, //TODO: replace 120px with theme value
            minHeight: { md: "480px" },
            width: "100%",
            overflow: "hidden",
            "&::before": {
              position: "absolute",
              content: '""',
              height: "100%",
              width: "100%",
              background: {
                xs: "none",
                md: "linear-gradient(to right, rgba(255,255,255,1) 0, rgba(255,255,255,0) 90%)",
              },
            },
            "& > img": {
              minWidth: "300px",
              objectPosition: { xs: "85%", md: "center" },
              aspectRatio: { xs: 1, md: 16 / 9 },
            },
          }}
        >
          <Image
            src="/images/server_error.png"
            alt="server error"
            width={0}
            height={0}
            sizes="100vw"
            priority
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {isMobile && (
            <Typography
              variant="body2"
              sx={{
                ...errorMessageStyles,
                position: { xs: "absolute" },
                bottom: theme.spacing(2),
                mx: theme.spacing(4),
                color: "#fff",
              }}
            >
              {error.message}
            </Typography>
          )}
        </Grid>
        {isMobile && (
          <Grid item sx={mobileButtonsStyles}>
            <Buttons />
          </Grid>
        )}
      </Grid>
    </BaseErrorPage>
  );
};

export default ServerError;
