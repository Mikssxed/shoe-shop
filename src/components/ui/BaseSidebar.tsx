'use client';

import {SxProps} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import {PropsWithChildren, useLayoutEffect, useState} from 'react';

type Props = PropsWithChildren & {
  open: boolean;
  containerStyle?: SxProps;
  isMobile?: boolean;
  onClose?: () => void;
};

export default function BaseSidebar({
  children,
  open,
  containerStyle,
  isMobile = false,
  onClose,
}: Props) {
  const [sidebarWidth, setSidebarWidth] = useState(320);

  useLayoutEffect(() => {
    function updateSize() {
      const width = window.innerWidth;
      setSidebarWidth(width < 700 ? 260 : 320);
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor={isMobile ? 'right' : 'left'}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: isMobile, // Better open performance on mobile.
      }}
      sx={{
        width: open ? sidebarWidth : 0,
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: sidebarWidth,
          height: {xs: '100%', md: 'calc(100vh - 120px)'}, // 120px is the height of the header TODO: change to theme value
          top: {xs: 0, md: '120px'}, // 120px is the height of the header TODO: change to theme value
          border: 'none',
          overflowX: 'hidden',
        },
        ...containerStyle,
      }}
    >
      {children}
    </Drawer>
  );
}
