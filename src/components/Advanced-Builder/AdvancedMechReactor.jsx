import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Tooltip,
} from "@mui/material";
import { tooltips } from "../constants/tooltips.tsx";

const AdvancedMechReactor = () => {
  const dispatch = useDispatch();

  const reactorType = useSelector((state) => state.mech.reactor.reactorType);
  const technologyBase = useSelector((state) => state.mech.technologyBase);

  const xlSlots = technologyBase === "Clan" ? 2 : 3;

  const handleReactorSelect = (event) => {
    const selectedType = event.target.value;

    if (selectedType === "XL" || selectedType === "Light") {
      const slots = ["loc1", "loc2"];
      if (technologyBase === "Inner Sphere" && selectedType === "XL") {
        slots.push("loc3");
      }
      dispatch(
        mechActions.unInstallEquipFromZone({
          zones: ["rtorso", "ltorso"],
          slots,
        })
      );
    }

    dispatch(mechActions.setReactorType(selectedType));
  };

  return (
    <div id="advanced-mech-reactor">
      <FormControl>
        <InputLabel htmlFor="select-reactor-input" id="select-reactor-label">
          Choose Reactor
        </InputLabel>
        <Select
          labelId="select-reactor-label"
          id="select-reactor"
          value={reactorType}
          onChange={handleReactorSelect}
          inputProps={{ id: "select-reactor-input" }}
          label="Choose Reactor"
        >
          <MenuItem id="standard-reactor" value="Standard">
            <Tooltip title={tooltips.reactor.standard} arrow placement="right">
              Standard
            </Tooltip>
          </MenuItem>
          <MenuItem id="xl-engine" value="XL">
            <Tooltip
              title={tooltips.reactor.xlEngine(xlSlots)}
              arrow
              placement="right"
            >
              XL Engine
            </Tooltip>
          </MenuItem>
          {technologyBase === "Inner Sphere" && (
            <MenuItem id="compact-engine" value="Compact">
              <Tooltip
                title={tooltips.reactor.compactReactor}
                arrow
                placement="right"
              >
                Compact Engine
              </Tooltip>
            </MenuItem>
          )}
          {technologyBase === "Inner Sphere" && (
            <MenuItem id="light-engine" value="Light">
              <Tooltip
                title={tooltips.reactor.lightEngine}
                arrow
                placement="right"
              >
                Light Engine
              </Tooltip>
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default AdvancedMechReactor;
