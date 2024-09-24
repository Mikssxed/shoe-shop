import {Container, Stack} from '@mui/material';

import {ProfileSidebar} from '@/components/common';

export default function ProfileLayout({children}: {children: React.ReactNode}) {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{maxWidth: 1850, mx: 'auto'}}
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
