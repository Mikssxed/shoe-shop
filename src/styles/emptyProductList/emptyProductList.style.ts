import { stylingConstants } from '@/lib/constants/themeConstants';

export const emptyProductListStyles = {
  emptyProductList_container: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0.7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyProductList_bagTickWrapper: {
    width: '72px',
    height: '72px',
    borderRadius: '100%',
    bgcolor: '#F9FAFB',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mb: '10px',
  },
  emptyProductList_message: {
    mb: '10px',
    textAlign: 'center',
    fontWeight: 500,
    fontSize: { xs: '16px', md: '20px' },
    lineHeight: { xs: '20px', md: '24px' },
    color: stylingConstants.palette.text.primary,
  },
  emptyProductList_subMessage: {
    fontWeight: 300,
    fontSize: { xs: '13px', md: '15px' },
    lineHeight: { xs: '15px', md: '17.5px' },
  },
  emptyProductList_link: {
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'center',
    textDecoration: 'none',
  },
  emptyProductList_addProductBtn: {
    width: 152,
    height: 40,
    borderRadius: '8px',
  },
};
