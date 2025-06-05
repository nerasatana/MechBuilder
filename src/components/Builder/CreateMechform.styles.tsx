import { Box, Paper, styled } from "@mui/material";

const StyledContentWrapper = styled(Paper)(({ theme }) => ({
  marginTop: "1rem",
  padding: "1.5rem",
  border: `1.5px solid ${theme.palette.primary.main}`,
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  "&:has( #mech-name-textfield)": {
    alignItems: "center",
  },
}));

export { StyledContentWrapper };
