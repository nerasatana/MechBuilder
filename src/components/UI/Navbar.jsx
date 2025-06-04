import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { mechActions } from "../../store/mech-slice";
import Button from "@mui/material/Button";
import { Box, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import FinalActions from "../Builder/FinalActions";

const Navbar = () => {
  const mech = useSelector((state) => state.mech);
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handleResetMech = () => {
    dispatch(mechActions.resetMechToInitialState(mech));
  };
  const handleAdvancedOptions = () => {
    dispatch(uiActions.toggleAdvancedOptions());
    dispatch(mechActions.resetMechToInitialState(mech));
  };

  return (
    <Stack spacing={2} alignItems="flex-end">
      <Stack direction="row" spacing={1} sx={{ margin: 0 }}>
        <Button
          variant={ui.advancedOptions ? "contained" : "outlined"}
          startIcon={
            <FontAwesomeIcon icon={ui.advancedOptions ? faCheck : faPlus} />
          }
          onClick={handleAdvancedOptions}
        >
          Advanced Options
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<FontAwesomeIcon icon={faTrashCan} />}
          onClick={handleResetMech}
        >
          Reset Mech
        </Button>
      </Stack>
      <FinalActions />
    </Stack>
  );
};

export default Navbar;
