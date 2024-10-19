import { stylingConstants } from '@/lib/constants/themeConstants';

const styles = {
  root: {
    display: { xs: 'none', lg: 'inline-flex' },
    position: 'absolute',
    right: '10px',
    bottom: '10px',
    border: 0,
    backgroundColor: stylingConstants.palette.primary.secondary,
    p: '6px 8px',
    minWidth: '44px',

    '& svg': {
      height: '20px',
      width: '27px',
      fill: stylingConstants.palette.primary.main,
    },

    '&:hover, &:focus': {
      bottom: '12px',
      backgroundColor: stylingConstants.palette.primary.main,
      color: '#fff',

      '& p': {
        display: 'block',
      },
      '& svg': {
        height: '16px',
        width: '21px',
        fill: '#fff',
      },
    },

    '&:disabled': {
      '& svg': {
        fill: stylingConstants.palette.grey[500],
      },
    },
  },
  text: {
    display: 'none',
    mr: '11px',
    color: '#fff',
    fontSize: 12,
    '&:hover, &:focus': { textDecoration: 'underline' },
  },
};

export default styles;
