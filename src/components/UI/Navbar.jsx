import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { mechActions } from "../../store/mech-slice";
import Button from "@mui/material/Button";
import { Stack, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faCheck,
  faPlus,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import RemainingTons from "../Builder/RemainingTons";

const Navbar = () => {
  const mech = useSelector((state) => state.mech);
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const handleResetMech = () => {
    dispatch(mechActions.resetMechToInitialState(mech));
  };
  const handleAdvancedOptions = () => {
    dispatch(uiActions.toggleAdvancedOptions());
    dispatch(mechActions.resetMechToInitialState(mech));
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <RemainingTons />
      <Stack spacing={2} alignItems="flex-end">
        <Stack direction="row" spacing={1} sx={{ margin: 0 }}>
          <Button
            variant={isDarkMode ? "contained" : "outlined"}
            color="error"
            startIcon={<FontAwesomeIcon icon={faTrashCan} />}
            onClick={handleResetMech}
          >
            Reset Mech
          </Button>
          <Button
            variant={ui.advancedOptions ? "contained" : "outlined"}
            startIcon={
              <FontAwesomeIcon icon={ui.advancedOptions ? faCheck : faPlus} />
            }
            onClick={handleAdvancedOptions}
          >
            Advanced Options
          </Button>
          {/* TODO: insert save-option */}
          <Button
            variant="contained"
            onClick={() => {}}
            startIcon={<FontAwesomeIcon icon={faSave} />}
          >
            Save Mech
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Navbar;
