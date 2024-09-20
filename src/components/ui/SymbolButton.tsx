import { MouseEvent, ReactNode } from "react";
import { Button } from "@mui/material";

interface ISymbolButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const SymbolButton: React.FC<ISymbolButtonProps> = ({
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <Button
      sx={{
        position: "relative",
        minWidth: { xs: "15px", md: "26px", xl: "32px" },
        minHeight: { xs: "15px", md: "26px", xl: "32px" },
        bgcolor: disabled ? "#E8E8E8" : "#FFD7D6",
        borderRadius: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        filter: disabled ? "grayscale(100%)" : undefined,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default SymbolButton;
