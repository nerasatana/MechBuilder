import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { useCallback } from "react";
import { Button, Stack } from "@mui/material";

const FinalActions = () => {
  const dispatch = useDispatch();

  const zones = useSelector((state) => state.mech.zones);
  const armorType = useSelector((state) => state.mech.armor.armorType);
  const armorSlots = useSelector((state) => state.mech.armor.armorSlots);
  const internalStructure = useSelector(
    (state) => state.mech.internalStructure
  );
  // const alphStrikeData = useSelector((state) => state.mech.alphStrikeData);

  const armorSlotsInstalled = Object.values(zones).some((zone) =>
    Object.values(zone).some((entry) => entry.includes("Ferro-Fibrous"))
  );

  const handleAlphaStrikeStats = () => {
    dispatch(mechActions.setAlphaStrikeData());
  };

  const installEndoSteelHandler = useCallback(() => {
    dispatch(mechActions.installEndoSteel());
  }, [dispatch]);

  const handleInstallArmorSlots = useCallback(() => {
    dispatch(
      mechActions.installReRollSlots({
        name: armorType,
        slots: armorSlots,
      })
    );
  }, [dispatch, armorType, armorSlots]);

  const handleRemoveArmor = useCallback(() => {
    dispatch(mechActions.removeAllArmorSlots());
  }, [dispatch]);

  return (
    <Stack direction="row" spacing={1}>
      <Button variant="contained" onClick={handleAlphaStrikeStats}>
        Alpha Strike Stats
      </Button>
      {internalStructure === "Endo Steel" && (
        <Button variant="contained" onClick={installEndoSteelHandler}>
          Install EndoSteel
        </Button>
      )}
      {armorType.includes("Ferro-Fibrous") && !armorSlotsInstalled && (
        <Button variant="contained" onClick={handleInstallArmorSlots}>
          Install {armorType} (Slots: {armorSlots})
        </Button>
      )}
      {armorSlots > 0 && (
        <Button variant="contained" onClick={handleRemoveArmor}>
          Remove ArmorSlots
        </Button>
      )}
    </Stack>
  );
};

export default FinalActions;
