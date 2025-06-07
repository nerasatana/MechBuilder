import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import AdvancedMechReactor from "../Advanced-Builder/AdvancedMechReactor";
import {
  Alert,
  AlertTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  Select,
} from "@mui/material";
import { useMemo } from "react";
import { tooltips } from "../constants/tooltips.tsx";
import { StyledContentWrapper } from "./CreateMechform.styles.tsx";

const MechReactor = () => {
  const dispatch = useDispatch();

  const walkingSpeed = useSelector((state) => state.mech.movement.walking);
  const tonnage = useSelector((state) => state.mech.tonnage);
  const reactor = useSelector((state) => state.mech.reactor, shallowEqual);
  const advancedOptions = useSelector((state) => state.ui.advancedOptions);

  const speedOptions = useMemo(() => {
    const options = [];
    let reactorValue = 0;
    let walkingSpeedMP = 1;
    while (reactorValue < 401) {
      reactorValue = tonnage * walkingSpeedMP;
      if (reactorValue < 401) {
        options.push(walkingSpeedMP);
      }
      walkingSpeedMP++;
    }
    return options;
  }, [tonnage]);

  const menuItems = useMemo(
    () =>
      speedOptions.map((speed) => (
        <MenuItem id={speed} key={speed} value={speed}>
          {speed}
        </MenuItem>
      )),
    [speedOptions]
  );

  const speedHandler = (event) => {
    dispatch(mechActions.addReactor(event.target.value));
  };

  return (
    <StyledContentWrapper id="mech-reactor" className="form-element">
      <Stack spacing={2}>
        <FormControl sx={{ maxWidth: "200px" }}>
          <Tooltip title={tooltips.movement} placement="right" arrow>
            <InputLabel htmlFor="select-speed-input" id="select-speed-label">
              Choose Walking Speed
            </InputLabel>
            <Select
              labelId="select-speed-label"
              label="Choose Walking Speed"
              id="select-speed"
              value={walkingSpeed}
              onChange={speedHandler}
              inputProps={{ id: "select-speed-input" }}
            >
              {menuItems}
            </Select>
          </Tooltip>
        </FormControl>

        {walkingSpeed > 0 && (
          <>
            {advancedOptions && <AdvancedMechReactor />}
            <Alert severity="info">
              <AlertTitle>
                Installing Reactor: {reactor.reactorType} {reactor.reactorValue}
              </AlertTitle>
              <Typography>
                -
                {reactor.reactorType === "XL"
                  ? reactor.xlTons
                  : reactor.reactorType === "Light"
                  ? reactor.light
                  : reactor.reactorType === "Compact"
                  ? reactor.compact
                  : reactor.standardTons}{" "}
                tons
              </Typography>
            </Alert>
          </>
        )}
      </Stack>
    </StyledContentWrapper>
  );
};
export default MechReactor;
