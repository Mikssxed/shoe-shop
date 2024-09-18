import {Work_Sans} from 'next/font/google';

// TODO: get the fonts from the general theme
const workSans = Work_Sans({style: ['normal', 'italic'], subsets: ['latin']});

export const userAvatar = {
  width: 1,
  height: 1,
  bgcolor: 'primary.main',
  color: '#fff',
};

export const updateProfileLabelStyles = {
  fontWeight: 500,
  fontSize: {xs: '12px', md: '15px'},
  lineHeight: {xs: '14.08px', md: '17.6px'},
  mb: {xs: '4.92px', md: '0.5rem'},
  color: '#494949',
};

export const updateProfileTextFieldStyles = {
  height: {xs: '33.08px', md: '48px'},
  p: {xs: '10.34px 11.74px 10.74px', md: '15px 16px'},
  borderRadius: {xs: '5.58px', md: '8px'},
  border: {xs: '0.7px solid #494949', md: '1px solid #494949'},
  fontSize: {xs: '10px', md: '15px'},
  fontWeight: 300,
  lineHeight: {xs: '11.73px', md: '17.6px'},
  color: '#5C5C5C',
  fontFamily: workSans.style.fontFamily,
};

export const updateProfileButtonStyles = {
  width: {xs: 117, md: 152},
  height: {xs: 30.79, md: 40},
  fontSize: {xs: '12.32px', md: '1rem'},
  lineHeight: {xs: '14.45px', md: '18.77px'},
  fontWeight: 500,
  textTransform: 'capitalize',
  p: 0,
  borderRadius: {xs: '6.16px', md: '8px'},
};

export const myProfileTitleStyles = {
  fontSize: {xs: '30px', md: '45px'},
  fontWeight: 500,
  lineHeight: {xs: '35.19px', md: '52.79px'},
};

export const updateProfileInfoBoxStyles = {
  display: 'flex',
  alignItems: 'center',
  width: {xs: 245, md: 'min-content'},
  height: {xs: 100, md: 150},
  gap: {xs: '28px', md: '76px'},
  m: {xs: '12px 0', md: '35.4px 0 49px'},
};

export const updateProfileAvatarContainer = {
  width: {xs: 100, md: 150},
  height: {xs: 100, md: 150},
  borderRadius: '50%',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
};

export const updateProfileButtonContainerStyles = {
  flexDirection: 'column',
  alignItems: 'flex-start',
  minHeight: '36px',
  gap: {xs: '1rem', md: '1.5rem'},
};

export const updateProfileDescStyles = {
  fontSize: {xs: '0.75rem', md: '15px'},
  fontWeight: 300,
  m: {xs: '0 4.8px 23.13px 0.28px', md: '0 0 48px'},
  lineHeight: {xs: '14.08px', md: '17.6px'},
  color: '#5C5C5C',
};

export const updateProfileInputContainer = {
  flexDirection: 'column',
  alignItems: 'flex-start',
  mb: '24px',
  maxWidth: 436,
};
