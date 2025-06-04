import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Tooltip,
} from "@mui/material";
import { StyledFormControl } from "../StyledComponents";
import { tooltips } from "../constants/tooltips.tsx";
import { StyledContentWrapper } from "./CreateMechform.styles.tsx";

const InternalStructureAndCockpit = () => {
  const dispatch = useDispatch();

  const internalStructure = useSelector(
    (state) => state.mech.internalStructure
  );
  const internalTons = useSelector((state) =>
    state.mech.internalStructure === "Standard"
      ? state.mech.armor.internal.standardton
      : state.mech.armor.internal.endosteel
  );
  const cockpitType = useSelector((state) => state.mech.cockpit.type);
  const cockpitWeight = useSelector((state) => state.mech.cockpit.weight);
  const techBase = useSelector((state) => state.mech.technologyBase);
  const advancedOptions = useSelector((state) => state.ui.advancedOptions);

  const endoSteelSlots = techBase === "Clan" ? 7 : 14;

  const internalStructureHandler = (event) => {
    dispatch(mechActions.setInternalStructure(event.target.value));
  };

  const cockpitHandler = (event) => {
    const cockpitType = event.target.value;
    if (cockpitType === "Standard Cockpit") {
      dispatch(
        mechActions.unInstallEquipFromZone({ zones: ["head"], slots: ["loc6"] })
      );
    }
    dispatch(mechActions.setCockpit(cockpitType));
  };

  return (
    <StyledContentWrapper id="mech-structure" className="form-element">
      {advancedOptions ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="300px"
        >
          <StyledFormControl>
            <InputLabel
              id="select-internal-label"
              htmlFor="select-internal-input"
            >
              Select Internal Structure
            </InputLabel>
            <Select
              labelId="select-internal-label"
              id="select-internal"
              label="Select Internal Structure"
              value={internalStructure}
              onChange={internalStructureHandler}
              style={{ minWidth: 120 }}
              inputProps={{ id: "select-internal-input" }}
            >
              <MenuItem id="Standard" value="Standard">
                <Tooltip
                  title={tooltips.internalStructure.standard}
                  placement="right"
                  arrow
                >
                  Standard
                </Tooltip>
              </MenuItem>

              <MenuItem id="Endo Steel" value="Endo Steel">
                <Tooltip
                  title={tooltips.internalStructure.endoSteel(endoSteelSlots)}
                  arrow
                >
                  Endo Steel
                </Tooltip>
              </MenuItem>
            </Select>
          </StyledFormControl>
          <span className="substract-tons">-{internalTons} tons</span>
        </Box>
      ) : (
        <p>
          Internal Structure: {internalStructure}{" "}
          <span className="substract-tons">-{internalTons} tons</span>
        </p>
      )}

      {advancedOptions && techBase === "Inner Sphere" ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="300px"
        >
          <FormControl sx={{ m: 1, minWidth: 180 }}>
            <InputLabel
              id="select-cockpit-label"
              htmlFor="select-cockpit-input"
            >
              Select Cockpit
            </InputLabel>
            <Select
              labelId="select-cockpit-label"
              id="select-cockpit"
              label="Select Cockpit"
              value={cockpitType}
              onChange={cockpitHandler}
              style={{ minWidth: 120 }}
              inputProps={{ id: "select-cockpit-input" }}
            >
              <MenuItem id="standard-cockpit" value="Standard Cockpit">
                <Tooltip
                  title={tooltips.cockpit.standard}
                  placement="right"
                  arrow
                >
                  Standard Cockpit
                </Tooltip>
              </MenuItem>
              <MenuItem id="small-cockpit" value="Small Cockpit">
                <Tooltip title={tooltips.cockpit.small} arrow>
                  Small Cockpit
                </Tooltip>
              </MenuItem>
            </Select>
          </FormControl>
          <span className="substract-tons">-{cockpitWeight} tons</span>
        </Box>
      ) : (
        <p>
          {cockpitType}:{" "}
          <span className="substract-tons">-{cockpitWeight} tons</span>
        </p>
      )}
    </StyledContentWrapper>
  );
};

export default InternalStructureAndCockpit;
