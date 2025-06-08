import { useSelector } from "react-redux";
import { useState, useMemo } from "react";

import ShopItem from "../Builder/ShopItem";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";

const AdvancedShop = ({ equipmentList }) => {
  const tonnage = useSelector((state) => state.mech.tonnage);
  const criticalSlots = useSelector((state) => state.mech.criticalSlots);
  const theme = useTheme();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const adjustedEquipment = useMemo(() => {
    return equipmentList.map((item) => {
      if (item.name === "Hatchet") {
        return {
          ...item,
          tons: Math.round(tonnage / 15),
          critical: Math.round(tonnage / 15),
        };
      }
      if (item.name === "Lance") {
        return {
          ...item,
          tons: Math.round(tonnage / 20),
          critical: Math.round(tonnage / 20),
        };
      }
      if (item.name === "Sword") {
        return {
          ...item,
          tons: Math.round(tonnage / 20),
          critical: Math.round(tonnage / 15),
        };
      }
      return item;
    });
  }, [equipmentList, tonnage]);

  const categoriesList = useMemo(() => {
    return [...new Set(equipmentList.map((item) => item.category))];
  }, [equipmentList]);

  const filteredList = useMemo(() => {
    return selectedCategory
      ? adjustedEquipment.filter((item) => item.category === selectedCategory)
      : adjustedEquipment;
  }, [adjustedEquipment, selectedCategory]);

  const groupedByCategory = categoriesList.reduce((acc, category) => {
    acc[category] = equipmentList.filter((item) => item.category === category);
    return acc;
  }, {});

  return (
    <>
      <Stack spacing={2} id="shop-categories" useFlexGap>
        <Button
          variant={selectedCategory ? "outlined" : "contained"}
          onClick={() => setSelectedCategory(null)}
          sx={{ width: "fit-content", margin: "0.25rem" }}
        >
          Show All ({equipmentList.length})
        </Button>
        <Stack
          direction="row"
          flexWrap="wrap"
          useFlexGap
          sx={{ paddingRight: "1rem" }}
        >
          {categoriesList.map((category) => (
            <Button
              size="small"
              color="secondary"
              variant={selectedCategory === category ? "contained" : "outlined"}
              key={category}
              onClick={() => setSelectedCategory(category)}
              sx={{ margin: "0.25rem" }}
            >
              {category} ({groupedByCategory[category]?.length || 0})
            </Button>
          ))}
        </Stack>
      </Stack>
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
          {filteredList.map((item) =>
            item.critical <= criticalSlots ? (
              <ShopItem item={item} key={item.name} />
            ) : null
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default AdvancedShop;
