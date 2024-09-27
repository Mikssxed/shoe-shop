import { Box, Toolbar, Typography, Button } from '@mui/material';

import ProfilePicture from '@/components/common/ProfilePicture';
import { UpdateProfile } from '@/components/common/UpdateProfile';
import {
  updateProfileAvatarContainer,
  updateProfileButtonContainerStyles,
  updateProfileButtonStyles,
  updateProfileInfoBoxStyles,
} from '@/styles/profile/updateProfileStyles';

export default function ProfileSettings() {
  return (
    <Box sx={{ px: '20px' }}>
      <Typography variant="h1">My Profile</Typography>
      <Box sx={updateProfileInfoBoxStyles}>
        <Box component="div" sx={updateProfileAvatarContainer}>
          <ProfilePicture
            avatarStyle={{ fontSize: { sm: '28px', md: '48px' } }}
          />
        </Box>
        {/* TODO: Replace the buttons below with reusable Button component */}
        <Toolbar
          sx={updateProfileButtonContainerStyles}
          disableGutters
          variant="dense"
        >
          <Button
            variant="outlined"
            color="error"
            sx={updateProfileButtonStyles}
          >
            Change Photo
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={updateProfileButtonStyles}
          >
            Delete
          </Button>
        </Toolbar>
      </Box>
      <Typography paragraph variant="body2">
        Welcome back! Please enter your details to log into your account.
      </Typography>
      <UpdateProfile />
    </Box>
  );
}
