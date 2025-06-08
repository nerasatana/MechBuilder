import { useSelector } from "react-redux";
import { useMemo } from "react";
import equipment_lvl1 from "../../data/equipment_lvl1";
import equipment_IS from "../../data/equipment_IS/equipment_IS";
import equipment_Clan from "../../data/equipment_Clan/equipment_Clan";

import AdvancedShop from "../Advanced-Builder/AdvancedShop";
import ShopItem from "./ShopItem";
import ShopAmmo from "./ShopAmmo";
import { StyledContentWrapper } from "./CreateMechform.styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";

const ShopEquipment = () => {
  const technologyBase = useSelector((state) => state.mech.technologyBase);
  const criticalSlots = useSelector((state) => state.mech.criticalSlots);
  const advancedOptions = useSelector((state) => state.ui.advancedOptions);
  const theme = useTheme();

  const filteredEquipment = useMemo(
    () => equipment_lvl1.filter((item) => item.critical <= criticalSlots),
    [criticalSlots]
  );

  return (
    <StyledContentWrapper
      id="shop-equipment"
      className="form-element"
      sx={{ maxHeight: "800px", overflow: "auto" }}
    >
      <ShopAmmo />

      <Typography variant="h6" component="h3">
        Choose Weapons
      </Typography>
      {advancedOptions ? (
        <AdvancedShop
          equipmentList={
            technologyBase === "Clan" ? equipment_Clan : equipment_IS
          }
        />
      ) : (
        <Table id="shop-table">
          <TableHead
            sx={{
              "& .MuiTableCell-head": { color: theme.palette.primary.main },
            }}
          >
            <TableRow>
              <TableCell>Weapon</TableCell>
              <TableCell>Tons</TableCell>
              <TableCell>Critical</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEquipment.map((item) => (
              <ShopItem item={item} key={item.name} />
            ))}
          </TableBody>
        </Table>
      )}
    </StyledContentWrapper>
  );
};

export default ShopEquipment;
