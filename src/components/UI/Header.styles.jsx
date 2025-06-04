import { AppBar, Box, styled, Typography } from "@mui/material";

const StyledHeaderWrapper = styled(AppBar)(({ theme, ownerState }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "all 0.3s ease",
  top: ownerState.shrink ? -70 : 0,
  height: 180,
  background: "rgba(255, 255, 255, 0.38)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(2.5px)",
  "-webkit-backdrop-filter": " blur(2.5px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  padding: "0.25rem 1rem",
  color: theme.palette.text.primary,

  "& img": {
    maxHeight: "4rem",
  },
}));

const StyledFlexBox = styled(Box)({
  margin: "0 0 0.5rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

const StyledImageWrapper = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const StyledHeaderTitle = styled(Typography)({
  marginLeft: "0.5rem",
});

export {
  StyledHeaderWrapper,
  StyledImageWrapper,
  StyledHeaderTitle,
  StyledFlexBox,
};
