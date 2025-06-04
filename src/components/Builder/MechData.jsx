import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import AdvancedMechData from "../Advanced-Builder/AdvancedMechData";
import { MenuItem, TextField, InputLabel, Stack } from "@mui/material";
import { StyledSelect, StyledFormControl } from "../StyledComponents";
import { useMemo } from "react";
import { StyledContentWrapper } from "./CreateMechform.styles";

const MechData = () => {
  const dispatch = useDispatch();
  const mechName = useSelector((state) => state.mech.name);
  const mechTonnage = useSelector((state) => state.mech.tonnage);
  const advancedOptions = useSelector((state) => state.ui.advancedOptions);

  const nameHandler = (event) => {
    dispatch(mechActions.setName(event.target.value));
  };

  const mechTonnageHandler = (event) => {
    dispatch(mechActions.setMechTonnage(event.target.value));
  };

  const tonnageOptions = useMemo(() => {
    const options = [
      20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
    ];
    return options.map((tonnage) => (
      <MenuItem key={tonnage} value={tonnage} id={tonnage}>
        {tonnage}
      </MenuItem>
    ));
  }, []);

  return (
    <>
      <StyledContentWrapper>
        <Stack spacing={2} sx={{ maxWidth: "fit-content" }}>
          <TextField
            id="mech-name-textfield"
            name="mech-name-textfield"
            label="Name your Mech"
            value={mechName}
            defaultValue={mechName}
            onChange={nameHandler}
          />
          {advancedOptions && <AdvancedMechData />}
          <StyledFormControl>
            <InputLabel
              id="select-mech-tonnage-label"
              htmlFor="select-mech-tonnage-input"
            >
              Select Mech Tonnage
            </InputLabel>
            <StyledSelect
              // labelId="select-mech-tonnage-label"
              id="select-mech-tonnage"
              name="select-mech-tonnage"
              value={mechTonnage}
              label="Select Mech Tonnage"
              onChange={mechTonnageHandler}
              inputProps={{ id: "select-mech-tonnage-input" }}
            >
              {tonnageOptions}
            </StyledSelect>
          </StyledFormControl>
        </Stack>
      </StyledContentWrapper>
    </>
  );
};

export default MechData;
