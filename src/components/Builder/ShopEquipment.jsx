import { useSelector } from "react-redux";
import { useMemo } from "react";
import equipment_lvl1 from "../../data/equipment_lvl1";
import equipment_IS from "../../data/equipment_IS/equipment_IS";
import equipment_Clan from "../../data/equipment_Clan/equipment_Clan";

import AdvancedShop from "../Advanced-Builder/AdvancedShop";
import ShopItem from "./ShopItem";
import ShopAmmo from "./ShopAmmo";
import { StyledContentWrapper } from "./CreateMechform.styles";

const ShopEquipment = () => {
  const technologyBase = useSelector((state) => state.mech.technologyBase);
  const criticalSlots = useSelector((state) => state.mech.criticalSlots);
  const advancedOptions = useSelector((state) => state.ui.advancedOptions);

  const filteredEquipment = useMemo(
    () => equipment_lvl1.filter((item) => item.critical <= criticalSlots),
    [criticalSlots]
  );

  return (
    <StyledContentWrapper id="shop-equipment" className="form-element">
      <ShopAmmo />

      <h3>Choose Weapons</h3>
      {advancedOptions ? (
        <AdvancedShop
          equipmentList={
            technologyBase === "Clan" ? equipment_Clan : equipment_IS
          }
        />
      ) : (
        <table id="shop-table">
          <thead>
            <tr>
              <th>Weapon</th>
              <th>Tons</th>
              <th>Critical</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEquipment.map((item) => (
              <ShopItem item={item} key={item.name} />
            ))}
          </tbody>
        </table>
      )}
    </StyledContentWrapper>
  );
};

export default ShopEquipment;
