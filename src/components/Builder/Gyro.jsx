import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { StyledFormControl, StyledSelect } from "../StyledComponents";
import { MenuItem, InputLabel, OutlinedInput, Tooltip } from "@mui/material";
import { tooltips } from "../constants/tooltips.tsx";
import { StyledContentWrapper } from "./CreateMechform.styles.tsx";

const Gyro = () => {
  const dispatch = useDispatch();

  const gyroType = useSelector((state) => state.mech.gyro.type);
  const gyroWeight = useSelector((state) => state.mech.gyro.weight);
  const techBase = useSelector((state) => state.mech.technologyBase);
  const advancedOptions = useSelector((state) => state.ui.advancedOptions);

  const handleGyroSelect = (event) => {
    const selectedType = event.target.value;

    if (selectedType === "Compact") {
      dispatch(
        mechActions.unInstallEquipFromZone({
          zones: ["ctorso"],
          slots: ["loc6", "loc7"],
        })
      );
    } else if (selectedType === "Extra-Light") {
      dispatch(
        mechActions.unInstallEquipFromZone({
          zones: ["ctorso"],
          slots: ["loc11", "loc12"],
        })
      );
    }

    dispatch(mechActions.setGyro(selectedType));
  };

  return (
    <StyledContentWrapper id="mech-gyro" className="form-element">
      {techBase === "Inner Sphere" && advancedOptions ? (
        <div>
          <StyledFormControl>
            <InputLabel
              htmlFor="select-gyro-outlined-input"
              id="select-gyro-label"
            >
              Choose Gyro
            </InputLabel>
            <StyledSelect
              labelId="select-gyro-label"
              id="select-gyro"
              value={gyroType}
              onChange={handleGyroSelect}
              input={
                <OutlinedInput
                  id="select-gyro-outlined-input"
                  label="Choose Gyro"
                  aria-labelledby="select-gyro-label"
                />
              }
            >
              <MenuItem id="standard-gyro" value="Standard">
                <Tooltip title={tooltips.gyro.standard} placement="right" arrow>
                  Standard
                </Tooltip>
              </MenuItem>
              <MenuItem id="heavy-duty-gyro" value="Heavy-Duty">
                <Tooltip
                  title={tooltips.gyro.heavyDuty}
                  placement="right"
                  arrow
                >
                  Heavy-Duty
                </Tooltip>
              </MenuItem>
              <MenuItem id="compact-gyro" value="Compact">
                <Tooltip
                  title={tooltips.gyro.compactGyro}
                  placement="right"
                  arrow
                >
                  Compact
                </Tooltip>
              </MenuItem>
              <MenuItem id="extra-light-gyro" value="Extra-Light">
                <Tooltip
                  title={tooltips.gyro.extraLight}
                  placement="right"
                  arrow
                >
                  Extra-Light
                </Tooltip>
              </MenuItem>
            </StyledSelect>
          </StyledFormControl>
          <span className="substract-tons">-{gyroWeight} tons</span>
        </div>
      ) : (
        <p>
          Installing Gyro:
          <span className="substract-tons">-{gyroWeight} tons</span>
        </p>
      )}
    </StyledContentWrapper>
  );
};

export default Gyro;
