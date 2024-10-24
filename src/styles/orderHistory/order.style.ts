import { stylingConstants } from '@/lib/constants/themeConstants';
import { textOverflowEllipsis } from '@/styles/commonStyles';
import { Roboto_Flex } from 'next/font/google';

const detailsSection = {
  p: '16px 24px',
  borderTop: '1px solid #E7EBEF',
};

export const orderListStyle = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    p: { md: 0 },
    m: 0,
    mt: { xs: '24px', md: '74px' },
  },
};

export const orderStyle = {
  card: {
    p: 0,
    width: '100%',
    backgroundColor: '#FAFAFA',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
  },

  summary: {
    border: 'none',
    p: '16px 24px',
    my: { xs: 0 },
    '& > .MuiAccordionSummary-content': {
      my: { xs: 0 },
    },
  },

  summaryItems: {
    display: { xs: 'grid', sm: 'flex' },
    gridTemplate: '1fr 1fr / 2fr 1fr 1fr',
    alignItems: 'center',
    gap: { xs: '4px', sm: '8px' },
    width: '100%',
    '& > *': {
      alignItems: 'center',
    },
  },

  summaryProducts: {
    mx: { xs: 0, sm: 'auto' },
    order: { xs: 4, sm: 2 },
  },

  summaryPrice: {
    order: { xs: 5, sm: 3 },
    justifySelf: 'center',
  },

  arrow: {
    display: 'flex',
    justifyContent: 'end',
    gap: '6px',
    ml: { xs: 'auto', sm: 0 },
    p: '4px',
  },

  details: {
    p: 0,
  },

  deliverySection: {
    ...detailsSection,
    display: 'flex',
    justifyContent: 'center',
    gap: { xs: '16px', sm: '32px' },
    '& > *': {
      flexDirection: { xs: 'column', sm: 'row' },
      textAlign: { xs: 'center', sm: 'left' },
    },
  },

  delivery: {
    maxWidth: {
      xs: 'calc(100vw - 250px)',
      sm: 'calc(100vw - 370px)',
    },
    ...textOverflowEllipsis.multiLine,
  },

  contacts: {
    maxWidth: {
      xs: 'calc(100vw - 240px)',
      sm: 'calc(100vw - 360px)',
    },
    ...textOverflowEllipsis.multiLine,
  },

  footer: {
    ...detailsSection,
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
  },
};

export const orderItemStyle = {
  orderItemSection: {
    ...detailsSection,
    display: { xs: 'grid', sm: 'flex' },
    gridTemplate: '1fr auto / 1fr 1fr',
    alignItems: 'center',
    gap: '12px',
  },

  infoContainer: {
    gridColumn: '1 / 3',
    display: 'flex',
    gap: '16px',
    width: { sm: 'min-content' },
  },

  about: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  pictureContainer: {
    height: { xs: '64px', md: '96px', xl: '104px' },
    width: { xs: '64px', md: '96px', xl: '104px' },
    position: 'relative',
  },

  picture: {
    borderRadius: '4px',
  },

  name: {
    color: stylingConstants.palette.text.primary,
    maxWidth: {
      xs: 'calc(100vw - 190px)',
      sm: 'calc(100vw - 370px)',
      md: '180px',
      lg: '350px',
      xl: '460px',
    },
    ...textOverflowEllipsis.singleLine,
  },

  size: {
    textWrap: 'nowrap',
  },

  quantity: {
    ml: { xs: 0, sm: 'auto' },
    width: '90px',
    textAlign: { xs: 'left', sm: 'right' },
    ...textOverflowEllipsis.singleLine,
  },

  price: {
    ml: { xs: 0, lg: '40px' },
    width: { xs: '90px', lg: '120px' },
    textAlign: { xs: 'left', sm: 'right' },
    ...textOverflowEllipsis.singleLine,
  },
};

export const orderStatusStyle = {
  status: {
    display: 'flex',
    gap: '6px',
    width: '80px',
    mx: { sm: '8px', lg: '32px' },
    justifySelf: 'center',
  },
};
