import { Dialog, useTheme } from "@mui/material";
import { SxProps } from "@mui/material";
import { PropsWithChildren, useRef } from "react";

type ModalProps = PropsWithChildren & {
  open: boolean;
  onClose: () => void;
  keepMounted?: boolean;
  containerStyle?: SxProps;
  paperStyle?: SxProps;
};

const Modal = ({
  children,
  open,
  onClose,
  containerStyle,
  paperStyle,
}: ModalProps) => {
  const theme = useTheme();
  const paperRef = useRef<any>(null);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      keepMounted
      onClick={(e) => {
        if (
          e.target !== paperRef.current &&
          !paperRef.current.contains(e.target)
        ) {
          onClose();
        }
      }}
      sx={{
        "& > .MuiBackdrop-root": {
          backgroundColor: "backdrop.main",
        },
        ...containerStyle,
      }}
      PaperProps={{
        sx: {
          padding: theme.spacing(4),
          margin: theme.spacing(),
          backgroundColor: theme.palette.background.default,
          boxShadow: "none",
          ...paperStyle,
        },
      }}
      ref={paperRef}
    >
      {children}
    </Dialog>
  );
};

export default Modal;
