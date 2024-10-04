import { stylingConstants } from '@/lib/constants/themeConstants';

export const errorTitleStyles = {
  pt: '36px',
  color: stylingConstants.palette.text.primary,
  textAlign: { xs: 'center', md: 'left' },
};

export const errorMessageStyles = {
  color: stylingConstants.palette.text.secondary,
  textAlign: { xs: 'center', md: 'left' },
  fontSize: { xs: '12px', md: '20px' },
};

export const desktopButtonsStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  minHeight: '40px',
  '& > *': { width: '152px' },
};

export const mobileButtonsStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  minHeight: '20px',
  width: '100%',
  m: '36px 0 44px',
  px: '20px',
  '& > *': { flexGrow: 1, width: '152px' },
};
