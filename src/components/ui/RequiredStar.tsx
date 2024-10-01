import { stylingConstants } from '@/lib/constants/themeConstants';
import { Typography } from '@mui/material';

const RequiredStar = () => {
  return (
    <Typography
      ml="5px"
      component="span"
      color={stylingConstants.palette.error.main}
    >
      *
    </Typography>
  );
};

export default RequiredStar;
