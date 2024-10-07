import { Box } from '@mui/material';
import Image from 'next/image';

export default function PageLoading() {
  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        mt: '40px',
        perspective: '1000px',
      }}
    >
      <Image
        src="/icons/logo.svg"
        alt="logo"
        width={160}
        height={120}
        style={{
          margin: 'auto',
          animation: 'spinAndGlow 3s infinite linear',
          transformOrigin: 'center',
        }}
      />
    </Box>
  );
}
