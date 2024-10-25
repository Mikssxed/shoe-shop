'use client';

import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useIsMobile } from '@/hooks';
import {
  desktopButtonsStyles,
  errorMessageStyles,
  errorTitleStyles,
  mobileButtonsStyles,
} from '@/styles/errorPage/errorStyles';
import { BaseErrorPage, ErrorButtons } from '@/components/common';

const NotFoundError = () => {
  const isMobile = useIsMobile();
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <BaseErrorPage>
      <Grid
        container
        columns={{ xs: 1, md: 2 }}
        sx={{
          justifyContent: 'center',
          width: '100%',
          height: { xs: '100%', md: 'calc(100% - 120px)' },
          mb: { xs: '44px', md: 0 },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '200px',
            backgroundColor: '#E5E5E7',
            zIndex: 0,
          }}
          display={{ md: 'none' }}
        ></Box>
        <Grid
          item
          xs={1}
          sx={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            gap: { xs: '12px', md: '20px' },
            justifyContent: { md: 'center' },
            flexDirection: 'column',
            marginInline: { xs: '28px', md: 0 },
            paddingInline: { xs: 0, md: '10%' },
          }}
        >
          <Typography variant="h1" sx={errorTitleStyles}>
            Error 404
          </Typography>
          <Typography
            variant="body2"
            sx={{ pb: '18px', ...errorMessageStyles }}
          >
            It seems that the page you tried to access might not exist anymore.
            Go back to the previous page or go to the home page.
          </Typography>
          {!isMobile && (
            <Grid item sx={desktopButtonsStyles}>
              <ErrorButtons onClick={goBack} cancelButtonText="Go back" />
            </Grid>
          )}
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            position: 'relative',
            mt: { xs: '-24px', md: 0 },
            minHeight: '400px',
            '& > img': {
              borderRadius: { xs: '0 0 39px 39px', md: 0 },
              objectFit: { md: 'fill' },
            },
          }}
        >
          <Image
            src="/images/not_found.png"
            alt="server error"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            priority
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        </Grid>
        {isMobile && (
          <Grid item sx={mobileButtonsStyles}>
            <ErrorButtons onClick={goBack} cancelButtonText="Go back" />
          </Grid>
        )}
      </Grid>
    </BaseErrorPage>
  );
};

export default NotFoundError;
