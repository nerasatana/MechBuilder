import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Tooltip,
  Alert,
  Typography,
  AlertTitle,
} from "@mui/material";
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
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <FormControl>
            <InputLabel
              id="select-internal-label"
              htmlFor="select-internal-input"
            >
              Select Internal Structure
            </InputLabel>
            <Select
              autoWidth
              labelId="select-internal-label"
              id="select-internal"
              label="Select Internal Structure"
              value={internalStructure}
              onChange={internalStructureHandler}
              inputProps={{ id: "select-internal-input" }}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
              }}
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
          </FormControl>
          <Alert severity="info">
            <Typography>-{internalTons} tons</Typography>
          </Alert>
        </Box>
      ) : (
        <Alert severity="info">
          <AlertTitle>Internal Structure: {internalStructure}</AlertTitle>
          <Typography className="substract-tons">
            -{internalTons} tons
          </Typography>
        </Alert>
      )}

      {advancedOptions && techBase === "Inner Sphere" ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginTop="1.5rem"
        >
          <FormControl>
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
          <Alert severity="info">
            <Typography>-{cockpitWeight} tons</Typography>
          </Alert>
        </Box>
      ) : (
        <Alert severity="info">
          <AlertTitle>{cockpitType}:</AlertTitle>
          <Typography className="substract-tons">
            -{cockpitWeight} tons
          </Typography>
        </Alert>
      )}
    </StyledContentWrapper>
  );
};

export default InternalStructureAndCockpit;
