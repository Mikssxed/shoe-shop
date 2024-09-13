import ProfilePicture from "@/components/ProfilePicture";
import { UpdateProfile } from "@/components/UpdateProfile";
import {
  myProfileTitleStyles,
  updateProfileAvatarContainer,
  updateProfileButtonContainerStyles,
  updateProfileButtonStyles,
  updateProfileDescStyles,
  updateProfileInfoBoxStyles
} from "@/styles/profile/updateProfileStyles";
import { Box, Button, Toolbar, Typography } from "@mui/material";

export default function ProfileSettings() {
  return (
    <Box>
      <Typography
        variant="h1"
        sx={myProfileTitleStyles}
      >
        My Profile
      </Typography>
      <Box sx={updateProfileInfoBoxStyles}>
        <Box
          component="div"
          sx={updateProfileAvatarContainer}>
          <ProfilePicture avatarStyle={{fontSize: { sm: "28px", md: "48px" }}} />
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
      <Typography
        paragraph
        sx={updateProfileDescStyles}
      >
        Welcome back! Please enter your details to log into your account.
      </Typography>
      <UpdateProfile />
    </Box>
  );
}