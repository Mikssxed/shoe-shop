import { Box, Typography } from '@mui/material';

import { UpdateProfileForm } from '@/components/forms/UpdateProfileForm';
import AvatarForm from '@/components/forms/AvatarForm';
import { settingPageStyles as styles } from '@/styles/profile/settingsPage.style';

export default function ProfileSettings() {
  return (
    <Box sx={styles.root}>
      <Box sx={{ display: 'block' }}>
        <Typography variant="h1" sx={styles.title}>
          My Profile
        </Typography>
        <AvatarForm />
        <Typography paragraph variant="body2" sx={styles.description}>
          Welcome! Fill in any missing information and keep it accurate.
        </Typography>
        <UpdateProfileForm />
      </Box>
    </Box>
  );
}
