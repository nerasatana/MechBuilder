import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import React from "react";
import { Box, Typography, Slider, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

const DistributeArmorSlider = ({ zone }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const zoneArmor = useSelector((state) => state.mech.armor.armorValue[zone]);
  const internal = useSelector((state) => state.mech.armor.internal[zone]);
  const unassignedPoints = useSelector(
    (state) => state.mech.armor.unassignedPoints
  );

  const maxArmor = zone === "head" ? 9 : internal * 2;

  const handleSliderChange = (event, value) => {
    const desired = Number(value);
    const totalAvailable = zoneArmor + unassignedPoints;
    const clampedValue = Math.min(desired, totalAvailable);

    dispatch(
      mechActions.addArmorValueToZone({
        zone,
        armorpoints: clampedValue,
      })
    );
  };

  return (
    <Stack>
      <Typography variant="body2">
        {`Choose Armor for ${t(`zones.${zone}`)}: ${zoneArmor} / ${maxArmor}`}
      </Typography>
      <Slider
        value={zoneArmor}
        min={0}
        max={maxArmor}
        onChange={handleSliderChange}
        aria-labelledby={`armor-slider-${zone}`}
        marks={[...Array(maxArmor + 1)].map((_, i) => ({ value: i, label: i }))}
      />
    </Stack>
  );
};

export default React.memo(DistributeArmorSlider);
