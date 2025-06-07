import { useSelector, useDispatch } from "react-redux";
import { Button, Tooltip, Box, Typography, Stack } from "@mui/material";
import { mechActions } from "../../store/mech-slice";
import DistributeArmorSlider from "./DistributeArmorSlider";
import DistributeArmorRearSlider from "./DistributeArmorRearSlider";
import { tooltips } from "../constants/tooltips.tsx";

const DistributeArmor = ({ maxArmor }) => {
  const dispatch = useDispatch();
  const chassisType = useSelector((state) => state.mech.chassisType);
  const unassignedPoints = useSelector(
    (state) => state.mech.armor.unassignedPoints
  );
  const isQuad = chassisType === "Quad";

  const handleDistribute = () => {
    dispatch(mechActions.autoArmorDistribution());
  };

  const handleMaxArmor = () => {
    dispatch(
      mechActions.maxArmor({ tons: maxArmor.tons, value: maxArmor.value })
    );
  };

  const handleStripArmor = () => {
    dispatch(mechActions.stripArmor());
  };

  return (
    <Stack spacing={2}>
      <Box display="flex" flexWrap="wrap" gap={1} alignItems="center">
        <Tooltip title={tooltips.armorButtons.distributeArmor} arrow>
          <span>
            <Button variant="contained" size="small" onClick={handleDistribute}>
              Assign automatically
            </Button>
          </span>
        </Tooltip>

        <Tooltip title={tooltips.armorButtons.maxArmor} arrow>
          <span>
            <Button variant="contained" size="small" onClick={handleMaxArmor}>
              Max. Value
            </Button>
          </span>
        </Tooltip>

        <Tooltip title={tooltips.armorButtons.stripArmor} arrow>
          <span>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={handleStripArmor}
            >
              Unassign all Armorpoints
            </Button>
          </span>
        </Tooltip>
      </Box>
      <Typography variant="body1">
        Unassigned Armorpoints:{" "}
        <Typography
          component="span"
          fontWeight="bold"
          color={unassignedPoints > 0 ? "primary" : "success"}
        >
          {unassignedPoints}
        </Typography>
      </Typography>
      <DistributeArmorSlider zone="head" />
      <DistributeArmorRearSlider zone="ctorso" rearzone="ctrear" />
      <DistributeArmorRearSlider zone="rltorso" rearzone="rltrear" />
      {isQuad ? (
        <>
          <DistributeArmorSlider zone="frlleg" />
          <DistributeArmorSlider zone="rrlleg" />
        </>
      ) : (
        <>
          <DistributeArmorSlider zone="rlarm" />
          <DistributeArmorSlider zone="rlleg" />
        </>
      )}
    </Stack>
  );
};

export default DistributeArmor;
