import { useSelector } from "react-redux";

import Gyro from "./Gyro";
import MechData from "./MechData";
import RemainingTons from "./RemainingTons";
import InternalStructureAndCockpit from "./InternalStructureAndCockpit";
import MechReactor from "./MechReactor";
import JumpJets from "./JumpJets";
import HeatSinks from "./HeatSinks";
import Armor from "./Armor";
import InstallEquipment from "./InstallEquipment";
import FinalActions from "./FinalActions";

import "./CreateMechForm.modules.css";
import ShopEquipment from "./ShopEquipment";
import { Box } from "@mui/material";

const CreateMechForm = () => {
  const mech = useSelector((state) => state.mech);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Box className="createForm" sx={{ width: "50%" }}>
      <form className="mechForm" action="" onSubmit={handleSubmit}>
        <MechData />
        {mech.remainingTons !== null && (
          <div>
            <InternalStructureAndCockpit />
            <MechReactor />
            {mech.movement.walking > 0 && <Gyro />}
            {mech.movement.walking > 0 && <JumpJets />}
            <HeatSinks />
            <Armor />
            <ShopEquipment />
            <InstallEquipment />
          </div>
        )}
      </form>
    </Box>
  );
};

export default CreateMechForm;
