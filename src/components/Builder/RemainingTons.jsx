import { useSelector } from "react-redux";
import React from "react";
import { Alert, Box, Typography, useTheme } from "@mui/material";

const RemainingTons = () => {
  const remainingTons = useSelector((state) => state.mech.remainingTons);
  const tonnage = useSelector((state) => state.mech.tonnage);
  const criticalSlots = useSelector((state) => state.mech.criticalSlots);
  const theme = useTheme();

  return (
    <Box>
      <Box>
        Remaining Tons:{" "}
        <Box
          component="span"
          id="tons-remaining"
          sx={{
            color:
              remainingTons < 0
                ? theme.palette.error.main
                : theme.palette.primary.main,
            fontWeight: "bold",
          }}
        >
          {remainingTons}
        </Box>{" "}
        of {tonnage} tons{" "}
        {remainingTons < 0 && (
          <Alert
            severity="error"
            component="span"
            sx={{ float: "right", marginLeft: "0.5rem" }}
          >
            Mech is overweight!
          </Alert>
        )}
      </Box>
      <Box id="critical-slots">
        Critical Slots:{" "}
        <Box
          component="span"
          id="critical-remaining"
          sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
        >
          {criticalSlots}
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(RemainingTons);
