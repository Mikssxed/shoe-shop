import {Container, Stack} from '@mui/material';

import {ProfileSidebar} from '@/components/common';

export default function ProfileLayout({children}: {children: React.ReactNode}) {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{maxWidth: 1850, mx: 'auto', px: '20px'}}
    >
      <ProfileSidebar open blockOnMobile />
      <Container
        maxWidth="xl"
        sx={{
          p: {xs: 0, md: '32px'},
        }}
      >
        {children}
      </Container>
    </Stack>
  );
}
