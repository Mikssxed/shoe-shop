import { stylingConstants } from '@/lib/constants/themeConstants';
import { SxProps } from '@mui/material';

export const productIdStyles: Record<string, SxProps> = {
  descriptionContainer: {
    mt: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  root: {
    maxWidth: '1300px',
    display: 'flex',
    flexDirection: { xs: 'column', lg: 'row' },
    gap: { xs: '40px', lg: '100px' },
    mt: { xs: '50px', sm: '100px' },
    pb: '100px',
  },
  noImageBox: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  genderAndColor: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '10px',
  },
  productContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  productLabel: {
    textAlign: 'left',
    color: stylingConstants.palette.grey[500],
    maxWidth: '100%',
    lineBreak: 'anywhere',
  },
  productName: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    display: 'flex',
    gap: '24px',
  },
};

export const actionButtonsStyles: Record<string, SxProps> = {
  addButtons: {
    mt: '10px',
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row',
    },
    gap: '10px',
    width: '100%',
  },
  productContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  productLabel: {
    textAlign: 'left',
    color: stylingConstants.palette.grey[700],
    maxWidth: '100%',
    lineBreak: 'anywhere',
  },
  actionButton: {
    flexBasis: '50%',
    p: {
      xs: '10px 15px',
      sm: '16px 20px',
    },
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  sizeBtn: {
    width: '100%',
    fontWeight: 'fontWeighRegular',
    fontSize: { xs: 10, sm: 15 },
    textTransform: 'uppercase',
    borderColor: 'grey.700',
    p: { xs: '8px 15px', sm: '10px 20px' },
    '&:hover': {
      borderColor: 'grey.700',
      backgroundColor: 'grey.100',
    },
    borderRadius: '12px',
  },
};
