import { Box, styled } from "@mui/material";

const StyledAdvancedOptionsWrapper = styled(Box)(({ theme }) => ({
  padding: "0.75rem",
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "8px",
}));

export { StyledAdvancedOptionsWrapper };
