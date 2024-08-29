import { Dialog, useTheme } from "@mui/material";
import { SxProps } from "@mui/material";
import { PropsWithChildren } from "react";

type ModalProps = PropsWithChildren & {
  open: boolean;
  onClose?: () => void;
  containerStyle?: SxProps;
};

const Modal = ({ children, open, onClose, containerStyle }: ModalProps) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& > .MuiBackdrop-root": {
          backgroundColor: "backdrop.main",
        },
      }}
      PaperProps={{
        sx: {
          padding: theme.spacing(4),
          margin: theme.spacing(),
          backgroundColor: theme.palette.background.default,
          boxShadow: "none",
          ...containerStyle,
        },
      }}
    >
      {children}
    </Dialog>
  );
};

export default Modal;
