import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { useMemo } from "react";
import {
  RadioGroup,
  Radio,
  InputLabel,
  MenuItem,
  Tooltip,
  Select,
  FormControl,
  FormLabel,
  FormControlLabel,
  Stack,
  Alert,
  AlertTitle,
  Typography,
} from "@mui/material";
import { tooltips } from "../constants/tooltips.tsx";
import { StyledContentWrapper } from "./CreateMechform.styles.tsx";

const HeatSinks = () => {
  const dispatch = useDispatch();

  const heatsinkType = useSelector((state) => state.mech.heatsinks.type);
  const heatsinkNumber = useSelector((state) => state.mech.heatsinks.number);
  const technologyBase = useSelector((state) => state.mech.technologyBase);
  const advancedOptions = useSelector((state) => state.ui.advancedOptions);

  const heatsinkSlots = technologyBase === "Clan" ? 2 : 3;

  const heatSinkOptions = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => (
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    ));
  }, []);

  const handleHeatSinkChange = (event) => {
    dispatch(mechActions.addHeatsinks(Number(event.target.value)));
  };

  const handleHeatsinkTypeChange = (event) => {
    dispatch(mechActions.setHeatsinkType(event.target.value));
  };

  const additionalHeatsinks = useMemo(() => {
    return Math.max(0, heatsinkNumber - 10);
  }, [heatsinkNumber]);

  return (
    <StyledContentWrapper id="mech-heatsinks" className="form-element">
      <Stack spacing={2}>
        {advancedOptions && (
          <FormControl component="fieldset">
            <FormLabel component="legend" id="heatsink-radio-group">
              Choose Heatsink Type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="heatsink-radio-group"
              name="heatsink-radio-group"
              onChange={handleHeatsinkTypeChange}
              value={heatsinkType}
            >
              <FormControlLabel
                value="standard"
                control={<Radio />}
                label={
                  <Tooltip title={tooltips.heatsinks.standard}>
                    <span>Standard</span>
                  </Tooltip>
                }
              />
              <FormControlLabel
                value="double"
                control={<Radio />}
                label={
                  <Tooltip title={tooltips.heatsinks.double(heatsinkSlots)}>
                    <span>Double</span>
                  </Tooltip>
                }
              />
            </RadioGroup>
          </FormControl>
        )}
        <FormControl>
          <InputLabel
            htmlFor="select-additional-heatsinks-input"
            id="select-additional-heatsinks-label"
          >
            Choose Additional Heatsinks
          </InputLabel>
          <Select
            labelId="select-additional-heatsinks-label"
            name="heatsink-select"
            id="heatsink-select"
            inputProps={{ id: "select-additional-heatsinks-input" }}
            onChange={handleHeatSinkChange}
            value={heatsinkNumber - 10}
            label="Choose Additional Heatsinks"
          >
            {heatSinkOptions}
          </Select>
        </FormControl>

        {additionalHeatsinks > 0 && (
          <Alert severity="info">
            <AlertTitle>
              Installing {additionalHeatsinks} additional Heatsinks:
            </AlertTitle>
            <Typography>-{additionalHeatsinks} tons</Typography>
          </Alert>
        )}
      </Stack>
    </StyledContentWrapper>
  );
};

export default HeatSinks;
