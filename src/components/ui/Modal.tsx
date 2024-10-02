'use client';

import { Dialog, SxProps, useTheme } from '@mui/material';
import { PropsWithChildren, useRef } from 'react';

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
      data-testid="modal"
      disableScrollLock={true}
      open={open}
      onClose={onClose}
      keepMounted
      onClick={e => {
        const target = e.target as Node;
        if (
          paperRef.current &&
          target !== paperRef.current &&
          !paperRef.current.contains(target) &&
          !document.querySelector('.MuiPopover-root')?.contains(target)
        ) {
          onClose();
        }
      }}
      sx={{
        '& > .MuiBackdrop-root': {
          backgroundColor: 'backdrop.main',
        },
        justifyContent: 'center',
        display: 'flex',
        ...containerStyle,
      }}
      PaperProps={{
        sx: {
          p: theme.spacing(4),
          m: theme.spacing(),
          backgroundColor: theme.palette.background.default,
          boxShadow: 'none',
          ...paperStyle,
        },
        onClick: (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation(),
      }}
      ref={paperRef}
    >
      {children}
    </Dialog>
  );
};

export default Modal;
