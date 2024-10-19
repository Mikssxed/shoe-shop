import { stylingConstants } from '@/lib/constants/themeConstants';

export default {
  root: {
    mt: { xs: '20px', md: '80px' },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    display: 'block',
    textAlign: { xs: 'center', md: 'start' },
  },
  info: {
    display: { xs: 'flex', md: 'block' },
    flexDirection: { xs: 'column', md: 'none' },
    textAlign: { xs: 'center', md: 'none' },
  },
  orderInfoBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: { xs: 'center', md: 'start' },
    justifyContent: { xs: 'center', md: 'start' },
    gap: '12px',

    '& p': {
      fontSize: { xs: 18, md: 24, lg: 32, xl: 48 },
      lineHeight: { xs: '22px', md: '28px', lg: '38px', xl: '56.3px' },
      wordBreak: 'break-word',
      overflowWrap: 'break-word',
    },
  },
  forYourOrder: {
    fontStyle: 'italic',
    fontWeight: 300,
    color: '#000',
  },
  orderId: {
    color: stylingConstants.palette.primary.main,
  },
  message: {
    fontSize: { xs: 15, md: 18, lg: 20, xl: 24 },
    fontWeight: 300,
    lineHeight: { xs: '22px', md: '30px', xl: '40px' },
    color: stylingConstants.palette.text.secondary,

    mt: { md: '35px', lg: '45px', xl: '77px' },
    width: { xs: 'calc(100% - 36px)', md: '444px', lg: '567px', xl: '767px' },
    textAlign: 'start',
    alignSelf: { xs: 'center', md: 'none' },
  },
  imgContainerXs: {
    display: { xs: 'flex', md: 'none' },
    alignItems: 'center',
    m: '20px auto',
    height: '252px',
    width: '277px',
    position: 'relative',
  },
  imgContainerMd: {
    display: { xs: 'none', md: 'block' },
    ml: { md: '50px', lg: '54px', xl: '107px' },
    height: { md: '282px', lg: '332px', xl: '450px' },
    width: { md: '310px', lg: '365px', xl: '494px' },
    position: 'relative',
  },
  buttonsContainer: {
    mt: { xs: '24px', md: '45px', lg: '75px', xl: '95px' },
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: '20px', xl: '30px' },
    position: 'relative',

    '& a': {
      height: '61px',
      mx: { xs: '18px', md: '0' },
      width: { xs: 'calc(100% - 36px)', md: '50%', lg: '220px', xl: '281px' },
      maxWidth: { md: 'calc((100% - 20px) / 2)' },
      position: 'relative',
    },
  },
  button: {
    width: '100%',
    height: '100%',
  },
};
