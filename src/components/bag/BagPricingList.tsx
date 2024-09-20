import { Box, Typography } from '@mui/material';

import { stylingConstants } from '@/lib/constants/themeConstants';

import { IBagPricingListProps } from '@/lib/types';

const BagPricingList: React.FC<IBagPricingListProps> = ({
  name,
  value,
  bold,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="h4">{name}</Typography>
      <Typography variant="h4">${value}</Typography>
    </Box>
  );
};

export default BagPricingList;
