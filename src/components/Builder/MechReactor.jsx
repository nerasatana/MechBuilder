import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import AdvancedMechReactor from "../Advanced-Builder/AdvancedMechReactor";
import { FormControl, InputLabel, MenuItem, Tooltip } from "@mui/material";
import { useMemo } from "react";
import { StyledSelect } from "../StyledComponents";
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
      <FormControl>
        <Tooltip title={tooltips.movement} placement="right">
          <InputLabel htmlFor="select-speed-input" id="select-speed-label">
            Choose Walking Speed
          </InputLabel>
          <StyledSelect
            labelId="select-speed-label"
            id="select-speed"
            value={walkingSpeed}
            onChange={speedHandler}
            inputProps={{ id: "select-speed-input" }}
          >
            {menuItems}
          </StyledSelect>
        </Tooltip>
      </FormControl>

      {walkingSpeed > 0 && (
        <>
          {advancedOptions && <AdvancedMechReactor />}
          <p>
            Installing Reactor: {reactor.reactorType} {reactor.reactorValue}
            <br />
            <span className="substract-tons">
              -
              {reactor.reactorType === "XL"
                ? reactor.xlTons
                : reactor.reactorType === "Light"
                ? reactor.light
                : reactor.reactorType === "Compact"
                ? reactor.compact
                : reactor.standardTons}{" "}
              tons
            </span>
          </p>
        </>
      )}
    </StyledContentWrapper>
  );
};
export default MechReactor;
