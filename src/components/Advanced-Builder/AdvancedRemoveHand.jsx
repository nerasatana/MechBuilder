import { useSelector, useDispatch } from "react-redux";
import {
  FormGroup,
  FormLabel,
  FormControlLabel,
  FormControl,
  Checkbox,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import { mechActions } from "../../store/mech-slice";
import { tooltips } from "../constants/tooltips.tsx";
import { StyledSecondaryContentWrapper } from "../Builder/CreateMechform.styles.tsx";

const AdvancedRemoveHand = () => {
  const dispatch = useDispatch();

  const rarm = useSelector((state) => state.mech.zones.rarm);
  const larm = useSelector((state) => state.mech.zones.larm);

  const handleActuatorChange = useCallback(
    (arm, actuator) => {
      const zone = [arm];
      const slots = ["loc3", "loc4"];
      dispatch(mechActions.unInstallEquipFromZone({ zones: zone, slots }));
      dispatch(mechActions.setArmActuators({ arm, actuator }));
    },
    [dispatch]
  );

  return (
    <StyledSecondaryContentWrapper>
      <Typography variant="h6" component="h4" sx={{ marginBottom: "1rem" }}>
        Uninstall Arm Actuators
      </Typography>
      <Grid container spacing={2}>
        <Grid>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormLabel component="legend" color="secondary">
                <Typography>Uninstall Right Arm Actuators</Typography>
              </FormLabel>
              <FormControlLabel
                control={
                  <Tooltip
                    title={tooltips.removingHands.handActuator}
                    placement="top"
                  >
                    <Checkbox
                      id="checkbox-right-hand"
                      checked={rarm.loc4 === "Hand Actuator"}
                      onChange={() =>
                        handleActuatorChange("rarm", "Hand Actuator")
                      }
                      color="secondary"
                    />
                  </Tooltip>
                }
                label="Right Hand Actuator"
              />
              <FormControlLabel
                control={
                  <Tooltip title={tooltips.removingHands.lowerArmActuator}>
                    <Checkbox
                      id="checkbox-right-lowerarm"
                      checked={rarm.loc3 === "Lower Arm Actuator"}
                      onChange={() =>
                        handleActuatorChange("rarm", "Lower Arm Actuator")
                      }
                      color="secondary"
                    />
                  </Tooltip>
                }
                label="Right Lower Arm Actuator"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormLabel component="legend" color="secondary">
                <Typography>Uninstall Left Arm Actuators</Typography>
              </FormLabel>
              <FormControlLabel
                control={
                  <Tooltip
                    title={tooltips.removingHands.handActuator}
                    placement="top"
                  >
                    <Checkbox
                      id="checkbox-left-hand"
                      checked={larm.loc4 === "Hand Actuator"}
                      onChange={() =>
                        handleActuatorChange("larm", "Hand Actuator")
                      }
                      color="secondary"
                    />
                  </Tooltip>
                }
                label="Left Hand Actuator"
              />
              <FormControlLabel
                control={
                  <Tooltip title={tooltips.removingHands.lowerArmActuator}>
                    <Checkbox
                      id="checkbox-left-lower-arm"
                      checked={larm.loc3 === "Lower Arm Actuator"}
                      onChange={() =>
                        handleActuatorChange("larm", "Lower Arm Actuator")
                      }
                      color="secondary"
                    />
                  </Tooltip>
                }
                label="Left Lower Arm Actuator"
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </StyledSecondaryContentWrapper>
  );
};

export default AdvancedRemoveHand;
