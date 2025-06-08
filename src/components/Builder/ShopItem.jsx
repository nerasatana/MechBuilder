import { mechActions } from "../../store/mech-slice";
import { useDispatch } from "react-redux";
import React from "react";
import {
  Tooltip,
  Typography,
  Box,
  TableRow,
  TableCell,
  Button,
  Paper,
  useTheme,
  alpha,
} from "@mui/material";
import { Highlight } from "../constants/tooltips";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ShopItem = ({ item }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const itemTooltip = (
    <Box sx={{ padding: 1 }}>
      <Paper sx={{ padding: "0.5rem" }}>
        <Typography variant="subtitle2" fontWeight="bold">
          {item.name}
        </Typography>
        <Typography variant="body2">
          Tons: <Highlight>{item.tons}</Highlight> | Crits:{" "}
          <Highlight>{item.critical}</Highlight>
        </Typography>
      </Paper>

      <Typography variant="body2">
        Category: <Highlight>{item.category}</Highlight>
      </Typography>

      {item.ammo !== "-" && (
        <Typography variant="body2">
          Ammo per Ton: <Highlight>{item.ammo}</Highlight>
        </Typography>
      )}
      {item.category !== "Special Equipment" && (
        <>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="body2">
              Heat: <Highlight>{item.heat}</Highlight>
            </Typography>
            <Typography variant="body2">
              Damage: <Highlight>{item.damage}</Highlight>
            </Typography>
          </Box>

          <Typography variant="body2">
            Range:
            <br />
            {item.minimal !== "-" && (
              <>
                {" "}
                Min.: <Highlight>{item.minimal}</Highlight>
              </>
            )}{" "}
            Short: <Highlight>{item.range[0]} </Highlight>Medium:{" "}
            <Highlight>{item.range[1]} </Highlight>Long:{" "}
            <Highlight>{item.range[2]} </Highlight>
          </Typography>
        </>
      )}
    </Box>
  );
  const handleAddItem = () => {
    const itemToAdd = { ...item };
    if (itemToAdd.category === "Special Equipment") {
      dispatch(mechActions.addGear(itemToAdd));
    } else {
      dispatch(mechActions.addWeapon(itemToAdd));
    }
  };

  return (
    <Tooltip title={itemTooltip} placement="top" arrow>
      <TableRow
        sx={{
          "&:hover": { background: alpha(theme.palette.primary.light, 0.1) },
        }}
      >
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.tons}</TableCell>
        <TableCell>{item.critical}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            size="small"
            onClick={handleAddItem}
            startIcon={<FontAwesomeIcon icon={faPlus} />}
          >
            Add
          </Button>
        </TableCell>
      </TableRow>
    </Tooltip>
  );
};

export default React.memo(ShopItem);
