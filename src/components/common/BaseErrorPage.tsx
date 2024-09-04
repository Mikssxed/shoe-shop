import { useIsMobile } from "@/hooks";
import Header from "../Header";
import { Box } from "@mui/material";

const BaseErrorPage = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();

  return (
    <Box sx={{ height: "100dvh" }}>
      {!isMobile && <Header />}
      {children}
    </Box>
  );
};

export default BaseErrorPage;
