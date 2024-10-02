import { buttonStyles } from '../commonStyles';

export const updateProfileFormStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    mt: { xs: '24px', md: '48px' },
    maxWidth: '436px',
    gap: '24px',
  },
  field: {
    padding: { xs: '10.34px 11.74px 10.74px', md: '15px 16px' },
    height: { xs: '33.08px', md: '48px' },
  },
  notAllowedWrapper: {
    opacity: 0.6,
    '& *': { cursor: 'not-allowed !important' },
  },
  submitButton: {
    ...buttonStyles.commonBtn,
    mt: '32px',
    alignSelf: 'flex-end',
  },
};
