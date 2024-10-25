import { stylingConstants } from '@/lib/constants/themeConstants';

const styles = {
  root: {
    display: 'inline-flex',
    position: 'absolute',
    right: { xs: '2px', sm: '3px', lg: '10px' },
    bottom: { xs: '1px', md: '3px', lg: '10px' },
    border: 0,
    backgroundColor: stylingConstants.palette.primary.secondary,
    p: { xs: '5px 4px', md: '6px 8px' },
    minWidth: '44px',

    '& svg': {
      height: '20px',
      width: '27px',
      fill: stylingConstants.palette.primary.main,
    },

    '&:hover, &:focus': {
      bottom: { xs: '2.5px', md: '4px', lg: '12px' },
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
