import { Box, Skeleton } from '@mui/material';
import React from 'react';

// TODO: rename it (it is not skeleton for avatar only, it is for [avatar + static 'Welcome' + name|username])
// PS: ProfilePicture component has his own skeleton, so probably we should use skeleton for name only in place where we use this component
const UserAvatarSkeleton = () => {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <Skeleton variant="circular" width={64} height={64} />
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Skeleton variant="text" sx={{ width: '54px', fontSize: '0.75rem' }} />
        <Skeleton
          variant="text"
          sx={{ width: { xs: '140px', md: '180px' }, fontSize: '1rem' }}
        />
      </Box>
    </Box>
  );
};

export default UserAvatarSkeleton;
