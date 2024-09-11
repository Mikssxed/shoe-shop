import { ProfileSidebar } from "@/components/common";
import { Container, Stack } from "@mui/material";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ maxWidth: 1850, marginX: "auto", paddingX: "20px" }}
    >
      <ProfileSidebar open blockOnMobile />
      <Container
        maxWidth="xl"
        sx={{
          padding: { xs: 0, md: "32px" },
        }}
      >
        {children}
      </Container>
    </Stack>
  );
}
