import { useDispatch, useSelector } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import {
  Alert,
  AlertTitle,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";

const ShopAmmo = () => {
  const dispatch = useDispatch();

  const equipment = useSelector((state) => state.mech.equipment);
  const criticalSlots = useSelector((state) => state.mech.criticalSlots);
  const remainingTons = useSelector((state) => state.mech.remainingTons);

  const handleAddAmmo = (weapon) => {
    dispatch(mechActions.addAmmo(weapon));
  };

  const handleRemoveAmmo = (weapon) => {
    dispatch(mechActions.removeAmmo(weapon));
  };

  const weaponsWithAmmo = [];
  let mechHasAmmoWeapons = false;

  equipment.weapons.forEach((weapon) => {
    if (!isNaN(Number(weapon.ammo))) {
      mechHasAmmoWeapons = true;
      const weaponWithAmmo = { ...weapon, number: 0 };
      weaponsWithAmmo.push(weaponWithAmmo);
    }
  });

  const groupedWeapons = weaponsWithAmmo.reduce((acc, weapon) => {
    if (acc[weapon.name]) {
      acc[weapon.name].number += 1;
    } else {
      acc[weapon.name] = { ...weapon, number: 1 };
    }
    return acc;
  }, {});

  const groupedWeaponsArray = Object.values(groupedWeapons);

  return (
    <div>
      {mechHasAmmoWeapons && (
        <Alert severity="info" sx={{ marginBottom: "1rem" }}>
          <AlertTitle>Ammo</AlertTitle>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Weapon</TableCell>
                <TableCell>Ammo/Ton</TableCell>
                <TableCell>Rounds</TableCell>
                <TableCell>Current Ammo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupedWeaponsArray.map((weapon) => {
                let ammoTons = 0;
                equipment.ammo.forEach((ammo) => {
                  if (ammo.ammoFor === weapon.name) {
                    ammoTons += ammo.tons;
                  }
                });

                return (
                  <TableRow key={`ammo${weapon.id}`}>
                    <TableCell>
                      {weapon.number} {weapon.name}
                    </TableCell>
                    <TableCell>{weapon.ammo}</TableCell>
                    <TableCell>
                      {Number(weapon.ammo) * Number(ammoTons)}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleRemoveAmmo(weapon)}
                        disabled={!ammoTons > 0.5}
                      >
                        <FontAwesomeIcon icon={faSquareMinus} />
                      </IconButton>
                      <Typography component="span" sx={{ margin: "0 0.5rem" }}>
                        {ammoTons}
                      </Typography>
                      <IconButton
                        onClick={() => handleAddAmmo(weapon)}
                        disabled={!criticalSlots > 0 && !remainingTons > 0}
                      >
                        <FontAwesomeIcon icon={faSquarePlus} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Alert>
      )}
    </div>
  );
};

export default ShopAmmo;
