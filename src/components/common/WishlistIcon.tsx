import { Box } from '@mui/material';
import { HeartSlash } from 'iconsax-react';

import { stylingConstants } from '@/lib/constants/themeConstants';

export default function WishlistIcon({
  handleWishlist,
  id,
}: {
  handleWishlist: (productId: string) => void;
  id: number;
}) {
  return (
    <Box
      component="div"
      sx={{
        width: '44px',
        height: '44px',
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: '1',
        p: '10px',
        bgcolor: '#FFFFFF80',
        borderRadius: '12px',
        cursor: 'pointer',
        '&:hover': {
          opacity: 0.8,
          '& svg': {
            color: stylingConstants.palette.primary.main,
          },
        },
        '& svg': {
          color: stylingConstants.palette.text.primary,
        },
      }}
      onClick={() => handleWishlist(id.toString())}
    >
      <HeartSlash size="24" />
    </Box>
  );
}
