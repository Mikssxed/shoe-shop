import { bagPageStyles as styles } from '@/styles/bag/bag.style';
import { Box, Divider, Skeleton } from '@mui/material';
import { Fragment } from 'react';

const BagItemsSkeleton = () => {
  return (
    <Box sx={styles.container}>
      {[1, 2, 3].map(index => (
        <Fragment key={index}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Skeleton
              variant="rectangular"
              width={120}
              height={120}
              sx={{ mr: 2 }}
            />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="80%" height={32} />
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="40%" height={24} />
            </Box>
          </Box>
          {index < 3 && <Divider sx={styles.itemsDivider} />}
        </Fragment>
      ))}
    </Box>
  );
};

export default BagItemsSkeleton;
