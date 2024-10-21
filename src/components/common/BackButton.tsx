'use client';

import { ArrowLeft } from 'iconsax-react';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import { BaseButton } from '../ui';

export default function BackButton() {
  const router = useRouter();

  const goBack = () => router.back();

  return (
    <BaseButton
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        width: 'min-content',
        bgcolor: 'transparent',
        border: 'none',
        p: 0,
        ml: { xs: '16px', sm: '24px' },
        '&:hover': {
          opacity: 0.7,
        },
      }}
      onClick={goBack}
    >
      <ArrowLeft size="24" color="#5C5C5C" />
      <Typography>Back</Typography>
    </BaseButton>
  );
}
