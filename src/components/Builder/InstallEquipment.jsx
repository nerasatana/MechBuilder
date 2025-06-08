import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import ShowEquipment from "./ShowEquipment";
import getFreeSlots from "../../util/getFreeSlots";
import AdvancedRemoveHand from "../Advanced-Builder/AdvancedRemoveHand";
import { useMemo, useCallback, useState } from "react";
import {
  Paper,
  useTheme,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Collapse,
  Button,
  Box,
} from "@mui/material";
import { StyledSecondaryContentWrapper } from "./CreateMechform.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const InstallEquipment = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const equipment = useSelector((state) => state.mech.equipment);
  const zones = useSelector((state) => state.mech.zones);
  const chassisType = useSelector((state) => state.mech.chassisType);
  const armorType = useSelector((state) => state.mech.armor.armorType);
  const advancedOptions = useSelector((state) => state.ui.advancedOptions);

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const { unInstalledEquipment, unInstalledWeapons, installedWeapons } =
    useMemo(() => {
      const unInstalledEquipment = [];
      const unInstalledWeapons = [];
      const installedWeapons = [];

      equipment.heatsinks.forEach((item) => {
        if (item.location === "n/a") unInstalledEquipment.push(item);
      });
      equipment.jumpjets.forEach((item) => {
        if (item.location === "n/a") unInstalledEquipment.push(item);
      });
      equipment.weapons.forEach((item) => {
        if (item.location === "n/a") {
          unInstalledEquipment.push(item);
          unInstalledWeapons.push(item);
        } else {
          installedWeapons.push(item);
        }
      });
      equipment.ammo.forEach((item) => {
        if (item.location === "n/a") {
          unInstalledEquipment.push(item);
        } else {
          installedWeapons.push(item);
        }
      });
      equipment.gear.forEach((item) => {
        if (item.location === "n/a") unInstalledEquipment.push(item);
      });

      return { unInstalledEquipment, unInstalledWeapons, installedWeapons };
    }, [equipment]);

  const getZonesWithFreeSlots = useCallback(
    (criticalSlots) => {
      const zonesWithFreeSlots = [];
      const freeSlots = getFreeSlots(zones);

      for (const [zone, slots] of Object.entries(freeSlots)) {
        if (slots >= criticalSlots) zonesWithFreeSlots.push(zone);
      }
      if (criticalSlots > 7 && chassisType === "Bipedal") {
        if (freeSlots["rarm"] + freeSlots["rtorso"] >= criticalSlots) {
          zonesWithFreeSlots.push("rarm/rtorso");
        }
        if (freeSlots["larm"] + freeSlots["ltorso"] >= criticalSlots) {
          zonesWithFreeSlots.push("larm/ltorso");
        }
      }
      if (criticalSlots > 7) {
        if (freeSlots["ctorso"] + freeSlots["rtorso"] >= criticalSlots) {
          zonesWithFreeSlots.push("ctorso/rtorso");
        }
        if (freeSlots["ctorso"] + freeSlots["ltorso"] >= criticalSlots) {
          zonesWithFreeSlots.push("ctorso/ltorso");
        }
      }
      return zonesWithFreeSlots;
    },
    [zones, chassisType]
  );

  const isJumpJetLegal = (zone) => ["rarm", "larm", "head"].includes(zone);

  const isZoneIllegalForEquip = (zone, equipment) => {
    if (equipment.name.includes("Jump Jet") && isJumpJetLegal(zone))
      return true;
    if (equipment.category === "Melee Weapon" && !zone.includes("arm"))
      return true;
    return false;
  };

  const checkIsUninstallAllowed = useCallback(
    (equipment) => {
      if (
        [
          "Jump Jet",
          "Heatsink",
          "Double Heatsink",
          "Improved Jump Jet",
        ].includes(equipment.name)
      )
        return false;
      if (equipment.name === "Guardian ECM" && armorType === "Stealth Armor")
        return false;
      return true;
    },
    [armorType]
  );

  const handleZoneSelect = useCallback(
    (event) => {
      const equipId = event.target.name;
      const equipToZone = event.target.value;
      if (equipToZone.includes("/")) {
        dispatch(
          mechActions.addSplitZoneWeapon({ id: equipId, zones: equipToZone })
        );
      } else {
        dispatch(
          mechActions.InstallEquipment({ id: equipId, zone: equipToZone })
        );
      }
    },
    [dispatch]
  );

  const handleRemoveEquipment = useCallback(
    (equip) => {
      dispatch(mechActions.removeEquipment(equip));
    },
    [dispatch]
  );

  const handleUnInstallSelect = useCallback(
    (event) => {
      const weaponId = event.target.value;
      dispatch(mechActions.unInstallEquipment(weaponId));
    },
    [dispatch]
  );

  const handleSplitZones = useCallback(
    (weapon, slotsLeft, slotsRight) => {
      dispatch(
        mechActions.installSplitZoneWeapon({
          weapon,
          slotsZoneA: slotsLeft,
          slotsZoneB: slotsRight,
        })
      );
    },
    [dispatch]
  );

  return (
    <>
      <Paper
        id="install-equipment"
        sx={{
          border: `1.5px solid ${theme.palette.secondary.main}`,
          borderRadius: "8px",
          padding: "1.5rem",
          marginTop: "1rem",
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" component="h3">
            Equipment:
          </Typography>
          <IconButton variant="contained" onClick={toggleExpanded}>
            <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} />
          </IconButton>
        </Box>
        <Collapse in={expanded}>
          {advancedOptions && chassisType === "Bipedal" && (
            <AdvancedRemoveHand />
          )}
          <ShowEquipment />
          {unInstalledEquipment.length > 0 && (
            <StyledSecondaryContentWrapper id="uninstalled-equipment">
              <Typography variant="h6" component="h3">
                Installing chosen Weapon (zone)
              </Typography>
              <Table id="equipment-table">
                <TableHead>
                  <TableRow>
                    <TableCell>Weapons and Ammo</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Critical</TableCell>
                    <TableCell>Tonnage</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {unInstalledEquipment.map((equipment) => (
                    <TableRow key={equipment.id}>
                      <TableCell>{equipment.name}</TableCell>
                      <TableCell>
                        <FormControl sx={{ width: "150px" }}>
                          <InputLabel
                            size="small"
                            id="equipment-choose-zone"
                            sx={{
                              color: `${theme.palette.secondary.main} !important`,
                            }}
                          >
                            Choose zone
                          </InputLabel>
                          <Select
                            labelId="equipment-choose-zone"
                            id={equipment.id}
                            name={equipment.id}
                            onChange={handleZoneSelect}
                            label="Choose zone"
                            size="small"
                            value={equipment.zone}
                            sx={{
                              width: "150px",
                              color: theme.palette.secondary.main,
                              ".MuiOutlinedInput-notchedOutline": {
                                borderColor: theme.palette.secondary.main,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: theme.palette.secondary.dark,
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: theme.palette.secondary.main,
                                },
                            }}
                          >
                            <MenuItem value="">n/a</MenuItem>
                            {getZonesWithFreeSlots(equipment.critical).map(
                              (zone) =>
                                isZoneIllegalForEquip(
                                  zone,
                                  equipment
                                ) ? null : (
                                  <MenuItem key={zone} value={zone}>
                                    {zone}
                                  </MenuItem>
                                )
                            )}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>{equipment.critical}</TableCell>
                      <TableCell>{equipment.tons}</TableCell>
                      <TableCell>
                        {checkIsUninstallAllowed(equipment) && (
                          <IconButton
                            onClick={() => handleRemoveEquipment(equipment)}
                            size="small"
                            color="error"
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </IconButton>
                        )}
                        {equipment.splitZones && (
                          <FormControl>
                            <InputLabel
                              id="equipment-splitzone"
                              htmlFor={equipment.name}
                            >
                              {equipment.splitZones[0] +
                                "/" +
                                equipment.splitZones[1]}
                            </InputLabel>
                            <Select
                              labelId="equipment-splitzone"
                              id={equipment.name}
                              name={equipment.name}
                              onChange={(e) => {
                                const [left, right] = e.target.value
                                  .split("/")
                                  .map(Number);
                                handleSplitZones(equipment, left, right);
                              }}
                            >
                              {Array.from(
                                { length: equipment.critical - 1 },
                                (_, i) => {
                                  const left = i + 1;
                                  const right = equipment.critical - left;
                                  const free = getFreeSlots(zones);
                                  const maxLeft = free[equipment.splitZones[0]];
                                  const maxRight =
                                    free[equipment.splitZones[1]];
                                  if (left > maxLeft || right > maxRight)
                                    return null;
                                  return (
                                    <option
                                      key={`${left}/${right}`}
                                      value={`${left}/${right}`}
                                    >
                                      {left}/{right}
                                    </option>
                                  );
                                }
                              )}
                            </Select>
                          </FormControl>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledSecondaryContentWrapper>
          )}
          {installedWeapons.length > 0 && (
            <StyledSecondaryContentWrapper>
              <Typography
                variant="h6"
                component="h4"
                sx={{ marginBottom: "1rem" }}
              >
                Uninstall Weapon (zone)
              </Typography>

              <FormControl>
                <InputLabel
                  id="equipment-uninstall-weapon"
                  sx={{
                    color: `${theme.palette.secondary.main} !important`,
                  }}
                >
                  Choose a weapon
                </InputLabel>
                <Select
                  labelId="equipment-uninstall-weapon"
                  id={equipment.id}
                  name={equipment.id}
                  onChange={handleUnInstallSelect}
                  label="Choose a weapon"
                  value={equipment.zone}
                  sx={{
                    color: theme.palette.secondary.main,
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.secondary.main,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.secondary.dark,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.secondary.main,
                    },
                  }}
                >
                  {installedWeapons.map((weapon) => (
                    <MenuItem key={weapon.name + weapon.id} value={weapon.id}>
                      {weapon.name} ({weapon.location})
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="body2" sx={{ marginTop: "0.5rem" }}>
                  Uninstalled weapons can be installed again.
                </Typography>
              </FormControl>
            </StyledSecondaryContentWrapper>
          )}
        </Collapse>
      </Paper>
    </>
  );
};

export default InstallEquipment;
