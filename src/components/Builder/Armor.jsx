import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  Slider,
  Tooltip,
} from "@mui/material";
import { mechActions } from "../../store/mech-slice";
import { uiActions } from "../../store/ui-slice";
import DistributeArmor from "./DistributeArmor";
import { StyledFormControl } from "../StyledComponents";
import { tooltips } from "../constants/tooltips.tsx";
import { StyledContentWrapper } from "./CreateMechform.styles.tsx";

const Armor = () => {
  const dispatch = useDispatch();

  const armor = useSelector((state) => state.mech.armor);
  const zones = useSelector((state) => state.mech.zones);
  const techBase = useSelector((state) => state.mech.technologyBase);
  const armorVisible = useSelector((state) => state.ui.armorVisible);
  const advancedOptions = useSelector((state) => state.ui.advancedOptions);

  const armorMultiplier = techBase === "Clan" ? 1.2 : 1.16;
  const ferroFibrousSlots = techBase === "Clan" ? 7 : 14;

  const maxArmor = armor.internal.maxarmor;

  const stepSize = 8 * armor.armorBasePointsMultiplier;

  const armorOptionsStandard = useMemo(() => {
    const options = [];
    const maxPoints = Math.round(
      maxArmor / 8 / armor.armorBasePointsMultiplier
    );
    for (let i = 0; i < maxPoints; i++) {
      const points = Math.round(i * 8 * armor.armorBasePointsMultiplier);
      if (points < maxArmor) {
        options.push({ tons: i * 0.5, value: points });
      }
    }
    options.push({ tons: maxPoints * 0.5, value: maxArmor });
    return options;
  }, [maxArmor, armor.armorBasePointsMultiplier]);

  const handleArmorSlider = (e) => {
    dispatch(mechActions.addArmor(Number(e.target.value)));
  };

  const handleArmorSelect = (e) => {
    dispatch(mechActions.addArmor(Number(e.target.value)));
  };

  const toggleArmorVisible = () => {
    dispatch(uiActions.toggleArmorVisible());
  };

  const removeEquipForStealthArmor = () => {
    for (const [zoneName, zone] of Object.entries(zones)) {
      if (zoneName === "head") continue;
      const totalSlots = Object.keys(zone).length;
      const slots = ["loc" + totalSlots, "loc" + (totalSlots - 1)];
      dispatch(
        mechActions.unInstallEquipFromZone({ zones: [zoneName], slots })
      );
    }
  };

  const handleArmorTypeSelect = (e) => {
    const type = e.target.value;
    if (type === "Stealth Armor") removeEquipForStealthArmor();
    dispatch(mechActions.setArmorType(type));
  };

  return (
    <StyledContentWrapper id="armor" className="form-element">
      <p>
        Armor Value: {armor.armorFactor}
        <br />
        Armor Weight: {armor.armorWeight} tons{" "}
        {armor.armorWeight > 0 && (
          <span className="substract-tons">-{armor.armorWeight} tons</span>
        )}
        {!armorVisible && (
          <button type="button" onClick={toggleArmorVisible}>
            Show Armor
          </button>
        )}
      </p>

      {advancedOptions && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="400px"
        >
          <StyledFormControl>
            <InputLabel id="select-armor-type-label">
              Choose Armor Type
            </InputLabel>
            <Select
              labelId="select-armor-type-label"
              id="select-armor-type"
              value={armor.armorType}
              label="Choose Armor Type"
              onChange={handleArmorTypeSelect}
            >
              <MenuItem key="standard-armor" value="Standard">
                <Tooltip
                  title={tooltips.armor.standard}
                  arrow
                  placement="right"
                >
                  Standard Armor
                </Tooltip>
              </MenuItem>
              <MenuItem key="ferro-fibrous-armor" value="Ferro-Fibrous">
                <Tooltip
                  title={tooltips.armor.ferroFibrous(
                    armorMultiplier,
                    ferroFibrousSlots
                  )}
                  arrow
                  placement="right"
                >
                  Ferro-Fibrous
                </Tooltip>
              </MenuItem>
              {techBase === "Inner Sphere" && [
                <MenuItem key="light-armor" value="Light Ferro-Fibrous">
                  <Tooltip title={tooltips.armor.light} arrow placement="right">
                    Light Ferro-Fibrous
                  </Tooltip>
                </MenuItem>,
                <MenuItem key="heavy-armor" value="Heavy Ferro-Fibrous">
                  <Tooltip title={tooltips.armor.heavy} arrow placement="right">
                    Heavy Ferro-Fibrous
                  </Tooltip>
                </MenuItem>,
                <MenuItem key="stealth" value="Stealth Armor">
                  <Tooltip
                    title={tooltips.armor.stealth}
                    arrow
                    placement="right"
                  >
                    Stealth Armor
                  </Tooltip>
                </MenuItem>,
              ]}
            </Select>
          </StyledFormControl>
        </Box>
      )}

      {armorVisible && (
        <div id="armor-distribution">
          <Box mt={2}>
            <p>Choose Armor by Points:</p>
            <Slider
              min={0}
              max={maxArmor}
              step={stepSize}
              value={armor.armorFactor}
              onChange={handleArmorSlider}
              aria-label="Armor Points"
              sx={{ width: 300 }}
            />
            {maxArmor}
          </Box>

          <Box mt={2}>
            <StyledFormControl>
              <InputLabel id="armor-tons-select-label">
                Choose Armor by Tons
              </InputLabel>
              <Select
                labelId="armor-tons-select-label"
                id="armor-tons-select"
                value={armor.armorFactor}
                onChange={handleArmorSelect}
                label="Choose Armor by Tons"
              >
                {armorOptionsStandard.map((opt) => (
                  <MenuItem key={opt.tons} value={opt.value}>
                    {opt.value} (tons: {opt.tons})
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
          </Box>

          {armor.armorFactor > 0 && (
            <DistributeArmor
              maxArmor={armorOptionsStandard[armorOptionsStandard.length - 1]}
            />
          )}
        </div>
      )}
    </StyledContentWrapper>
  );
};

export default Armor;
