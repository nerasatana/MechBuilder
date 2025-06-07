import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { useState, useMemo } from "react";
import {
  RadioGroup,
  Radio,
  MenuItem,
  InputLabel,
  Tooltip,
  FormControl,
  FormLabel,
  FormControlLabel,
  Select,
  Stack,
  Alert,
  AlertTitle,
  Typography,
} from "@mui/material";
import { tooltips } from "../constants/tooltips.tsx";
import { StyledContentWrapper } from "./CreateMechform.styles.tsx";

const JumpJets = () => {
  const dispatch = useDispatch();

  const walkingSpeed = useSelector((state) => state.mech.movement.walking);
  const runningSpeed = useSelector((state) => state.mech.movement.running);
  const jumping = useSelector((state) => state.mech.movement.jumping);
  const jumpJetWeight =
    useSelector((state) => state.mech.equipment.jumpjets?.[0]?.tons) || 0;
  const advancedOptions = useSelector((state) => state.ui.advancedOptions);
  const [jumpJetType, setJumpJetType] = useState("Standard");

  const jumpOptions = useMemo(() => {
    const options = [];
    const maxJump = jumpJetType === "Improved" ? runningSpeed : walkingSpeed;

    const minJump = jumpJetType === "Improved" ? walkingSpeed + 1 : 0;

    for (let i = minJump; i <= maxJump; i++) {
      options.push(i);
    }

    return options.map((jumpJet) => (
      <MenuItem id={`jj` + jumpJet} key={jumpJet} value={jumpJet}>
        {jumpJet}
      </MenuItem>
    ));
  }, [jumpJetType, walkingSpeed, runningSpeed]);

  const handleJumpJetSelect = (event) => {
    dispatch(
      mechActions.addJumpJets({
        numberOfJumpJets: Number(event.target.value),
        jumpJetType,
      })
    );
  };

  const improvedJumpJetHandler = (event) => {
    const selectedType = event.target.value;
    setJumpJetType(selectedType);
    dispatch(mechActions.removeJumpJets());
  };

  return (
    <StyledContentWrapper id="mech-jumpjets" className="form-element">
      <Stack spacing={2}>
        {advancedOptions && (
          <FormControl component="fieldset">
            <FormLabel component="legend" id="jumpjet-radio-group">
              Choose Jumpjet Type
            </FormLabel>
            <RadioGroup
              row
              id="radiogroup-jumpjet"
              aria-labelledby="jumpjet-radio-group"
              name="jumpjet-radio-group"
              value={jumpJetType}
              onChange={improvedJumpJetHandler}
            >
              <FormControlLabel
                id="standard-jumpjet"
                value="Standard"
                control={<Radio />}
                label={
                  <Tooltip
                    title={tooltips.jumpjets.standardJumpJets}
                    placement="top"
                    arrow
                  >
                    <span>Standard</span>
                  </Tooltip>
                }
              />
              <FormControlLabel
                id="improved-jumpjet"
                value="Improved"
                control={<Radio />}
                label={
                  <Tooltip
                    title={tooltips.jumpjets.improvedJumpJets}
                    placement="right"
                    arrow
                  >
                    <span>Improved</span>
                  </Tooltip>
                }
              />
            </RadioGroup>
          </FormControl>
        )}
        <FormControl>
          <InputLabel
            id="select-jumpjet-label"
            htmlFor="select-jumpjet-outlined-input"
          >
            Choose Jump Capability
          </InputLabel>
          <Select
            labelId="select-jumpjet-label"
            name="select-jumpjet"
            id="select-jumpjet"
            value={jumping}
            onChange={handleJumpJetSelect}
            inputProps={{ id: "select-jumpjet-outlined-input" }}
            label="Choose Jump Capability"
          >
            {jumpOptions}
          </Select>
        </FormControl>

        {jumping > 0 && (
          <Alert severity="info">
            <AlertTitle>Installing Jumpjets: {jumping}</AlertTitle>
            <Typography>-{jumping * jumpJetWeight} tons</Typography>
          </Alert>
        )}
      </Stack>
    </StyledContentWrapper>
  );
};

export default JumpJets;
