"use client";
import { ProfileSidebar } from "@/components/common";
import { useIsMobile } from "@/hooks";
import { Container, Stack } from "@mui/material";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ maxWidth: 1850, marginX: "auto", paddingX: "20px" }}
    >
      {!isMobile && <ProfileSidebar open />}
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
