import { stylingConstants } from '@/lib/constants/themeConstants';

const styles = {
  appBar: {
    width: '100%',
    position: 'sticky',
    boxShadow: 'none',
  },
  toolBar: {
    flexGrow: 1,
    paddingInline: { xs: '20px', md: '30px', lg: '40px 60px' },
    backgroundcolor: stylingConstants.palette.background.default,
    justifyItems: 'end',
    minHeight: { xs: '60px' },
    gap: { xs: '20px', md: 0 },
  },
  leftSide: { display: 'flex', flexGrow: 1 },
  logoSubtext: {
    align: 'center',
    marginInline: '44px',
    lineHeight: '30px',
    color: stylingConstants.palette.text.primary,
  },
  signInButton: {
    width: 'min(145px, 14vw)',
    height: { xs: '36px', md: '48px' },
    typography: {
      textTransform: 'none',
      fontWeight: '600',
    },
  },
  cartItemAmount: {
    position: 'absolute',
    backgroundColor: stylingConstants.palette.primary.main,
    minWidth: '26px',
    textAlign: 'center',
    borderRadius: '16px',
    fontSize: { xs: 12, md: 15 },
    padding: { xs: '2px 4px', md: '4px 8px' },
    color: 'white',
    transform: 'translate(-10px, -10px)',
  },
  profilePictureLink: {
    width: 24,
    height: 24,
    display: 'flex',
    textDecoration: 'none',
    borderRadius: '50%',
  },
};

export default styles;
