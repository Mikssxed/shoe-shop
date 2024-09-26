import { Box, Skeleton } from '@mui/material';

import { updateProfileFormStyles as styles } from '@/styles/forms/updateProfileForm.style';

export const UpdateProfileFormSkeleton: React.FC = () => {
  const emptyArray = [1, 2, 3, 4];
  return (
    <Box sx={styles.root}>
      {emptyArray.map((i) => (
        <Box key={i}>
          <Skeleton
            variant="rounded"
            height={18}
            width={60}
            sx={{ mb: '8px' }}
          />
          <Skeleton variant="rounded" height={48} />
        </Box>
      ))}

      <Skeleton variant="rounded" sx={styles.submitButton} />
    </Box>
  );
};
