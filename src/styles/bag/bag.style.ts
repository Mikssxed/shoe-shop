import { stylingConstants } from '@/lib/constants/themeConstants';

export const bagPageStyles = {
  rootTitleMobile: {
    p: '14px 14px 0px 14px',
    mb: { xs: '12px' },
    display: { xs: 'block', md: 'none' },
  },
  rootTitleDesktop: {
    display: { xs: 'none', md: 'block' },
    mb: { xs: '12px', md: '57px' },
  },
  main: {
    pt: { xs: '14px', md: '80px' },
    pb: { xs: '0px', md: '60px' },
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: '40px',
    justifyContent: 'space-between',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    maxWidth: '963px',
  },
  itemsDivider: {
    my: { xs: '15px', md: '60px' },
    borderColor: { xs: 'white', md: 'rgba(0, 0, 0, 0.12)' },
  },
  summaryTitleXs: {
    p: '14px 14px 0px 14px',
    mb: { xs: '12px' },
    display: { xs: 'block', md: 'none' },
  },
  bagSummaryContainerXs: {
    pt: '25px',
    display: { xs: 'flex', md: 'none' },
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bagSummaryContainerMd: {
    display: { xs: 'none', md: 'block' },
    width: '100%',
    maxWidth: { md: '300px', lg: '400px' },
  },

  emptyCart_main: {
    height: '100%',
    pt: '80px',
    display: 'flex',
    flexDirection: 'column',
  },
  emptyCart_rootTitle: {
    display: { xs: 'none', md: 'block' },
    mb: '57px',
  },
  emptyCart_container: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0.7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCart_bagTickWrapper: {
    width: '72px',
    height: '72px',
    borderRadius: '100%',
    bgcolor: '#F9FAFB',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mb: '10px',
  },
  emptyCart_message: {
    mb: '10px',
    textAlign: 'center',
    fontWeight: 500,
    fontSize: { xs: '16px', md: '20px' },
    lineHeight: { xs: '20px', md: '24px' },
    color: stylingConstants.palette.text.primary,
  },
  emptyCart_subMessage: {
    fontWeight: 300,
    fontSize: { xs: '13px', md: '15px' },
    lineHeight: { xs: '15px', md: '17.5px' },
  },
  emptyCart_addProductBtn: {
    mt: '41px',
    borderRadius: '8px',
    textTransform: 'none',
    width: '148px',
  },
};

export const bagItemStyles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    gap: { xs: '15px', md: '30px', xl: '46px' },
  },
  picture: {
    height: { xs: '100px', md: '156px', xl: '214px' },
    width: { xs: '105px', md: '160px', xl: '223px' },
    objectFit: 'cover',
    position: 'relative',
  },
  noImagePaper: {
    height: 1,
    backgroundColor: 'grey.A100',
    borderRadius: 0,
  },
  about: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  name: { color: stylingConstants.palette.text.primary },
  gender: { mt: '4px' },
  inStockText: {
    mt: '12px',
    display: {
      xs: 'none',
      md: 'block',
    },
    color: stylingConstants.palette.primary.main,
    fontWeight: 600,
  },
  price: {
    fontSize: { xs: 12, md: 20, xl: 30 },
    lineHeight: { xs: '14px', md: '23px', xl: '35.2px' },
    color: stylingConstants.palette.text.primary,
    fontWeight: 500,
  },
  amountButtons: {
    display: 'flex',
    alignItems: { xs: 'end', md: 'center' },
    gap: { xs: '5px', md: '7px', xl: '9px' },
    justifyContent: { xs: 'space-between', md: 'right' },
  },
  deleteButton: {
    fontSize: { xs: '12px', md: '18px', xl: '24px' },
    lineHeight: { xs: '14px', md: '20px', xl: '28px' },
    p: 0,
    fontWeight: '400',
    textTransform: 'none',
    color: '#6E7278',
  },
  deleteIconWrapper: {
    position: 'relative',
    mr: '4px',
    height: { xs: '14px', xl: '24px' },
    width: { xs: '14px', xl: '24px' },
  },
  selectSize: {
    ml: { xs: 1, md: 2 },
    [`& div[role="combobox"]`]: {
      fontSize: { xs: 12, md: 16 },
      lineHeight: { xs: '13px' },
      p: 1,
    },
  },
  selectSize_menuItem: {
    minHeight: 'min-content',
    height: 30,
  },
};

export const quantityButtonsStyles = {
  md_root: {
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
    gap: { xs: '5px', xl: '9px' },
    justifyContent: 'right',
    flexDirection: { xs: 'column', md: 'row' },
  },
  md_buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: '5px', md: '7px', xl: '9px' },
    justifyContent: 'right',
  },
  md_amount: {
    fontWeight: 400,
    fontSize: { xs: 12, md: 18, xl: 24 },
    lineHeight: { xs: '14px', md: '20px', xl: '28px' },
  },
  md_quantityText: {
    fontWeight: 400,
    mx: { xs: '4px', md: '6px', xl: '8px' },
    fontSize: { xs: 12, md: 18, xl: 24 },
    lineHeight: { xs: '14px', md: '20px', xl: '28px' },
    color: stylingConstants.palette.grey[700],
  },
  md_dividerAfterQuantity: {
    display: { xs: 'none', md: 'block' },
    width: '1px',
    height: '24px',
    bgcolor: '#8B8E93',
  },

  xs_root: {
    display: { sm: 'flex', md: 'none' },
    flexDirection: 'column',
  },
  xs_buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: '5px', md: '7px', xl: '9px' },
    mt: '4px',
  },
  xs_amount: { fontSize: { xs: 12, md: 18, xl: 24 }, fontWeight: 400 },
};
