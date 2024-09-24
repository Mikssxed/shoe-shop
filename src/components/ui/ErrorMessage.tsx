import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';

import { inter } from '@/lib/constants/themeConstants';
import { stylingConstants } from '@/lib/constants/themeConstants';

interface ErrorMessageProps {
  errorMessage?: string;
}

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return (
    <Box
      sx={{
        color: stylingConstants.palette.error.main,
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
      }}
    >
      <Image
        src={'/icons/warningIcon.svg'}
        alt="warning"
        width={15}
        height={13}
      />
      <Typography
        component="p"
        color={stylingConstants.palette.error.main}
        sx={{
          margin: 0,
          fontSize: 15,
          fontFamily: inter.style.fontFamily,
        }}
      >
        {errorMessage}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
