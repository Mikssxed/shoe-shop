import { Box } from '@mui/material';
import Image from 'next/image';

export default function PageLoading() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
