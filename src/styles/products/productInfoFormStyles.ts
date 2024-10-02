import { stylingConstants } from '@/lib/constants/themeConstants';
import { buttonStyles } from '../commonStyles';

export const productInfoFormContainer = {
  display: 'flex',
  flexDirection: { xs: 'column' },
  rowGap: '1rem',
  maxWidth: '1480px',
  justifyContent: { md: 'space-between' },
  position: 'relative',
  p: { xs: '24px 20px', md: '20px 0' },
};

export const productInfoTitle = {
  fontWeight: stylingConstants.typography.fontWeightLight,
  lineHeight: { xs: '14.08px', sm: '17.6px' },
  m: { xs: '12px 0 23.13px 0', md: '35.4px 0 40px 0' },
  p: '0 4.8px 0 0.28px',
  maxWidth: '890px',
  letterSpacing: '-0.1px',
};

export const formAndImagesContainer = {
  display: 'flex',
  flexDirection: { xs: 'column', lg: 'row' },
  rowGap: '24px',
  columnGap: { xs: '24px', lg: '138px' },
  maxWidth: '1480px',
};

export const inputContainer = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '436px',
  gap: { xs: '5px', sm: '8px' },
};

export const productSizeButton = {
  width: '100%',
  fontWeight: stylingConstants.typography.fontWeightLight,
  fontSize: { xs: 10, sm: 15 },
  borderColor: stylingConstants.palette.grey[700],
  backgroundColor: 'transparent',
  p: { xs: '8px 15px', sm: '10px 20px', xl: '10px 26px' },
  '&:hover': {
    borderColor: stylingConstants.palette.grey[700],
    backgroundColor: stylingConstants.palette.grey[100],
    color: stylingConstants.palette.grey[700],
  },
  borderRadius: '12px',
  color: stylingConstants.palette.text.secondary,
};

export const productImageContainer = {
  position: 'relative',
  aspectRatio: 320 / 380,
  maxWidth: '320px',
  maxHeight: '380px',
};
// TODO: Some of these styles are the same with products page's image card styles. Create common styles for them
export const imageCoverOnHover = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  opacity: '0%',
  transition: 'opacity 0.3s ease-in-out',
  ':hover': { opacity: '100%' },
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const trashIconContainer = {
  backgroundColor: 'rgba(255,255,255, 0.70)',
  borderRadius: '50%',
  flexDirection: 'column',
  fontSize: '14px',
  width: '80px',
  height: '80px',
  boxShadow: '0px 4px 10px 0px #00000026',
};

export const imageUploadBox = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  p: { xs: '74px 37px', lg: '147px 72px' },
  border: `1px dashed ${stylingConstants.palette.text.secondary}`,
  textAlign: 'center',
  cursor: 'pointer',
  maxWidth: { sm: '320px' },
  maxHeight: { sm: '380px' },
  '&:hover': {
    borderColor: '#aaa',
  },
};

export const imageUploadText = {
  fontWeight: stylingConstants.typography.fontWeightLight,
  lineHeight: '17.6px',
  color: stylingConstants.palette.text.secondary,
};

export const saveButtonContainer = {
  maxWidth: { xs: '436px', lg: 'none' },
  textAlign: 'right',
  mt: { lg: '6px' },
  position: { lg: 'absolute' },
  top: 20,
  right: 0,
};

export const formSaveButton = {
  ...buttonStyles.commonBtn,
  ...buttonStyles.disabledBtn,
  flexShrink: 0,
  alignSelf: { xs: 'flex-end', lg: 'flex-start' },
};
