import theme from "@/theme";

export const errorTitleStyles = {
  paddingTop: "36px",
  color: theme.palette.text.primary,
  textAlign: { xs: "center", md: "left" },
  fontSize: { xs: "30px", md: "45px" },
};

export const errorMessageStyles = {
  color: theme.palette.text.secondary,
  textAlign: { xs: "center", md: "left" },
  fontSize: { xs: "12px", md: "20px" },
};

export const desktopButtonsStyles = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  minHeight: "40px",
  "& > *": { width: "152px" },
};

export const mobileButtonsStyles = {
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  minHeight: theme.spacing(5),
  width: "100%",
  margin: "36px 0 44px",
  paddingX: "20px",
  "& > *": { flexGrow: 1, width: "152px" },
};
