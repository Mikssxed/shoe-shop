import { stylingConstants } from '@/lib/constants/themeConstants';

export const textOverflowEllipsis = {
  singleLine: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    display: 'inline-block',
  },
  multiLine: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 2,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
  },
};

export const buttonStyles = {
  commonBtn: {
    width: { xs: 117, md: 152 },
    height: { xs: 30.79, md: 40 },
    fontSize: { xs: '12.32px', md: '1rem' },
    lineHeight: { xs: '14.45px', md: '18.77px' },
    fontWeight: 500,
    p: 0,
    borderRadius: { xs: '6.16px', md: '8px' },
  },
  authBtn: {
    maxWidth: '436px',
    py: '14px',
    fontSize: '16px',
    lineHeight: '18px',
    borderRadius: '8px',
  },
  searchInputBtn: {
    alignSelf: 'center',
    fontSize: { xs: '10px', sm: '14px', md: '18px' },
    height: '60%',
    width: { xs: '5%', sm: '10%', md: '12%' },
    minWidth: { xs: '40px', sm: '60px' },
  },
  disabledBtn: {
    '&.Mui-disabled': {
      backgroundColor: stylingConstants.palette.primary.main,
      color: '#fff',
      opacity: 0.5,
    },
  },
  symbolBtn: {
    minWidth: { xs: '15px', md: '26px', xl: '32px' },
    minHeight: { xs: '15px', md: '26px', xl: '32px' },
    borderRadius: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
