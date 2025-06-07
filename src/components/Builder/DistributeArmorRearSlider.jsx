import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Slider, Typography, Stack } from "@mui/material";
import { mechActions } from "../../store/mech-slice";
import { useTranslation } from "react-i18next";

const DistributeArmorRearSlider = ({ zone, rearzone }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const armor = useSelector((state) => state.mech.armor);
  const zoneArmor = useSelector((state) => state.mech.armor.armorValue[zone]);

  const maxArmor = useMemo(
    () => armor.internal[zone] * 2,
    [armor.internal, zone]
  );

  const checkOverArmored = (points) => Math.min(points, armor.unassignedPoints);

  const frontSlideHandler = (_, newValue) => {
    const frontValue = checkOverArmored(newValue);
    const rearValue = Math.min(
      maxArmor - frontValue,
      armor.armorValue[rearzone]
    );

    dispatch(
      mechActions.addArmorValueToZone({ zone, armorpoints: frontValue })
    );
    dispatch(
      mechActions.addArmorValueToZone({
        zone: rearzone,
        armorpoints: rearValue,
      })
    );
  };

  const rearSlideHandler = (_, newValue) => {
    const rearValue = checkOverArmored(newValue);
    const frontValue = Math.min(maxArmor - rearValue, armor.armorValue[zone]);

    dispatch(
      mechActions.addArmorValueToZone({
        zone: rearzone,
        armorpoints: rearValue,
      })
    );
    dispatch(
      mechActions.addArmorValueToZone({ zone, armorpoints: frontValue })
    );
  };

  return (
    <>
      <Typography variant="body2">
        {`Choose Armor for ${t(`zones.${zone}`)}: ${zoneArmor} / ${maxArmor}`}
      </Typography>
      <Slider
        value={armor.armorValue[zone]}
        min={0}
        max={maxArmor}
        onChange={frontSlideHandler}
        sx={{ width: 300 }}
        aria-label={`Front armor slider for ${zone}`}
      />
      <Typography variant="body2">
        {`Choose Armor for ${t(
          `zones.${rearzone}`
        )}: ${zoneArmor} / ${maxArmor}`}
      </Typography>
      <Slider
        value={armor.armorValue[rearzone]}
        min={0}
        max={maxArmor}
        onChange={rearSlideHandler}
        sx={{ width: 300 }}
        aria-label={`Rear armor slider for ${rearzone}`}
      />
    </>
  );
};

export default React.memo(DistributeArmorRearSlider);
