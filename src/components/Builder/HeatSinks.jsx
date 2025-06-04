import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { useMemo } from "react";
import {
  RadioGroup,
  Radio,
  InputLabel,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  StyledFormControl,
  StyledFormLabel,
  StyledFormControlLabel,
  StyledSelect,
} from "../StyledComponents";
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
      {advancedOptions && (
        <StyledFormControl component="fieldset">
          <StyledFormLabel component="legend" id="heatsink-radio-group">
            Choose Heatsink Type
          </StyledFormLabel>

          <RadioGroup
            row
            aria-labelledby="heatsink-radio-group"
            name="heatsink-radio-group"
            onChange={handleHeatsinkTypeChange}
            value={heatsinkType}
          >
            <StyledFormControlLabel
              value="standard"
              control={<Radio />}
              label={
                <Tooltip title={tooltips.heatsinks.standard}>
                  <span>Standard</span>
                </Tooltip>
              }
            />
            <StyledFormControlLabel
              value="double"
              control={<Radio />}
              label={
                <Tooltip title={tooltips.heatsinks.double(heatsinkSlots)}>
                  <span>Double</span>
                </Tooltip>
              }
            />
          </RadioGroup>
        </StyledFormControl>
      )}
      <br></br>
      <StyledFormControl>
        <InputLabel
          htmlFor="select-additional-heatsinks-input"
          id="select-additional-heatsinks-label"
        >
          Choose Additional Heatsinks
        </InputLabel>
        <StyledSelect
          labelId="select-additional-heatsinks-label"
          name="heatsink-select"
          id="heatsink-select"
          inputProps={{ id: "select-additional-heatsinks-input" }}
          onChange={handleHeatSinkChange}
          value={heatsinkNumber - 10}
        >
          {heatSinkOptions}
        </StyledSelect>
      </StyledFormControl>

      {additionalHeatsinks > 0 && (
        <p>
          Installing {additionalHeatsinks} additional Heatsinks:
          <span className="substract-tons">-{additionalHeatsinks} tons</span>
        </p>
      )}
    </StyledContentWrapper>
  );
};

export default HeatSinks;
