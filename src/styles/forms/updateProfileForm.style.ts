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
    width: { xs: 117, md: 152 },
    height: { xs: 30.79, md: 40 },
    mt: '32px',
    alignSelf: { xs: 'center', md: 'flex-end' },
  },
};
