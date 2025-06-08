import { useSelector } from "react-redux";
import { useMemo } from "react";
import { Alert, Box, Stack, Typography, useTheme } from "@mui/material";
import { StyledContentWrapper } from "./CreateMechform.styles";

const ShowEquipment = () => {
  const weapons = useSelector((state) => state.mech.equipment.weapons);
  const ammo = useSelector((state) => state.mech.equipment.ammo);
  const gear = useSelector((state) => state.mech.equipment.gear);
  const theme = useTheme();

  const equipment = useMemo(
    () => [...weapons, ...ammo, ...gear],
    [weapons, ammo, gear]
  );

  if (equipment.length === 0) return null;

  return (
    <Stack
      spacing={2}
      sx={{
        border: `1.5px solid ${theme.palette.secondary.main}`,
        borderRadius: "8px",
        padding: "1.5rem",
        marginTop: "1rem",
      }}
    >
      <Typography variant="h6" component="h4" sx={{ marginBottom: "1rem" }}>
        Chosen Weapons
      </Typography>
      {equipment.map((item) => (
        <Box display="flex" alignItems="center" gap={2}>
          <Typography key={item.id}>{item.name}</Typography>
          <Alert severity="info" sx={{ width: "fit-content" }}>
            -{item.tons} tons
          </Alert>
        </Box>
      ))}
    </Stack>
  );
};

export default ShowEquipment;
