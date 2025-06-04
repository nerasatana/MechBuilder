import { useSelector, useDispatch } from "react-redux";
import {
  FormGroup,
  FormLabel,
  FormControlLabel,
  FormControl,
  Checkbox,
  Grid,
  Tooltip,
} from "@mui/material";
import { useCallback } from "react";
import { mechActions } from "../../store/mech-slice";
import { tooltips } from "../constants/tooltips.tsx";
import { StyledContentWrapper } from "../Builder/CreateMechform.styles.tsx";

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
    <StyledContentWrapper>
      <Grid container spacing={2}>
        <Grid>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormLabel component="legend" sx={{ color: "#ffa726" }}>
                Uninstall Right Arm Actuators
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
              <FormLabel component="legend" sx={{ color: "#ffa726" }}>
                Uninstall Left Arm Actuators
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
                    />
                  </Tooltip>
                }
                label="Left Lower Arm Actuator"
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </StyledContentWrapper>
  );
};

export default AdvancedRemoveHand;
