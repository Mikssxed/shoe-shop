import { stylingConstants } from '@/lib/constants/themeConstants';

export const orderFormStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  openPromocodeField: {
    alignSelf: 'flex-start',
    p: '0',
    fontSize: { xs: '16px', sm: '20px' },
    lineHeight: { xs: '17px', sm: '23.5px' },
    fontWeight: 400,
    color: '#000',
    textTransform: 'none',
  },
  bagPricingList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    mt: '38px',
  },
  dividerBeforeTotal: {
    mb: '22px',
    mt: { xs: '28px', md: '40px', xl: '56px' },
  },
  dividerAfterTotal: {
    mt: '22px',
    mb: { xs: '113px', md: '0px' },
  },
  md_checkoutBtn: {
    display: { xs: 'none', md: 'block' },
    mt: { md: '70px', xl: '113px' },
    fontSize: '16px',
    height: '40px',
  },
  xs_checkoutContainer: {
    p: '10px',
    borderTop: 'thin solid rgba(0, 0, 0, 0.12)',
    display: { xs: 'flex', md: 'none' },
    position: 'fixed',
    left: '0',
    bottom: '0px',
    width: '100%',
    height: '60px',
    bgcolor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  xs_checkoutBtn: {
    fontSize: '16px',
    width: '100%',
    maxWidth: '400px',
  },
};
