import { IProfileInfoInputField } from "@/lib/types/update-profile-types";
import {
  myProfileTitleStyles,
  updateProfileAvatarStyles,
  updateProfileButtonContainerStyles,
  updateProfileButtonStyles,
  updateProfileDescStyles,
  updateProfileInfoBoxStyles,
  updateProfileInputContainer,
  updateProfileLabelStyles,
  updateProfileTextFieldStyles,
} from "@/styles/profile/updateProfileStyles";
import {
  Avatar,
  Box,
  Button,
  InputLabel,
  OutlinedInput,
  Toolbar,
  Typography,
} from "@mui/material";
import { Work_Sans } from "next/font/google";

// TODO: get the fonts from the general theme
const workSans = Work_Sans({ style: ["normal", "italic"], subsets: ["latin"] });

// TODO: remove this data when the original data fetched and rendered on the page
const profileInfoFormData: IProfileInfoInputField[] = [
  {
    id: "PIIFD-1",
    label: "Name",
    required: true,
    htmlFor: "name",
  },
  {
    id: "PIIFD-2",
    label: "Surname",
    required: false,
    htmlFor: "surname",
  },
  {
    id: "PIIFD-3",
    label: "Email",
    required: false,
    htmlFor: "email",
  },
  {
    id: "PIIFD-4",
    label: "Phone number",
    required: false,
    htmlFor: "phone-number",
  },
];

// TODO: All inputs should be replace in future with reusable component
const ProfileInfoInputField = ({
  input,
}: {
  input: IProfileInfoInputField;
}) => {
  // TODO: add error line and style to the inputs when handling validation
  return (
    <Toolbar sx={updateProfileInputContainer} disableGutters variant="dense">
      <InputLabel
        htmlFor={`profile-input-${input.htmlFor}`}
        sx={updateProfileLabelStyles}
        className={workSans.className}
      >
        {input.label}{" "}
        {input.required && <span style={{ color: "#FE645E" }}>*</span>}
      </InputLabel>
      <OutlinedInput
        id={`profile-input-${input.htmlFor}`}
        required={input.required}
        fullWidth
        sx={updateProfileTextFieldStyles}
        inputProps={{ style: { padding: 0 } }}
      />
    </Toolbar>
  );
};

const ProfileInfoForm = () => {
  return (
    <Box
      component="form"
      autoComplete="on"
      sx={{ display: "flex", flexDirection: "column", maxWidth: "436px" }}
    >
      {profileInfoFormData.map((input) => (
        <ProfileInfoInputField key={input.id} input={input} />
      ))}
      {/* TODO: replace the button component below with the reusable Button component */}
      <Button
        variant="contained"
        // TODO: change the color when theme colors updated
        color="error"
        className={workSans.className}
        sx={{
          ...updateProfileButtonStyles,
          marginTop: "32px",
          alignSelf: "flex-end",
        }}
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default function UpdateProfile() {
  return (
    <Box>
      <Typography
        variant="h1"
        className={workSans.className}
        sx={myProfileTitleStyles}
      >
        My Profile
      </Typography>
      <Box sx={updateProfileInfoBoxStyles}>
        <Avatar
          alt="Remy Sharp"
          src="/images/avatar.png"
          sx={updateProfileAvatarStyles}
        />
        {/* TODO: Replace the buttons below with reusable Button component */}
        <Toolbar
          sx={updateProfileButtonContainerStyles}
          disableGutters
          variant="dense"
        >
          <Button
            variant="outlined"
            // TODO: change the color when theme colors updated
            color="error"
            className={workSans.className}
            sx={updateProfileButtonStyles}
          >
            Change Photo
          </Button>
          <Button
            variant="contained"
            // TODO: change the color when theme colors updated
            color="error"
            className={workSans.className}
            sx={updateProfileButtonStyles}
          >
            Delete
          </Button>
        </Toolbar>
      </Box>
      <Typography
        paragraph
        className={workSans.className}
        sx={updateProfileDescStyles}
      >
        Welcome back! Please enter your details to log into your account.
      </Typography>
      <ProfileInfoForm />
    </Box>
  );
}
