import { useDispatch, useSelector } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import {
  RadioGroup,
  Radio,
  Tooltip,
  Typography,
  Box,
  Stack,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import React from "react";
import { tooltips } from "../constants/tooltips.tsx";
import { StyledAdvancedOptionsWrapper } from "./AdvancedMechData.styles.tsx";

const AdvancedMechData = () => {
  const dispatch = useDispatch();

  const technologyBase = useSelector((state) => state.mech.technologyBase);
  const chassisType = useSelector((state) => state.mech.chassisType);

  const handleTechBaseRadio = (event) => {
    dispatch(mechActions.setTechnologyBase(event.target.value));
  };

  const handleChassisTypeRadio = (event) => {
    dispatch(mechActions.setChassisType(event.target.value));
  };

  return (
    <StyledAdvancedOptionsWrapper
      component="section"
      aria-label="Mech Configuration"
    >
      <Typography
        color="primary"
        variant="h6"
        sx={{ fontVariant: "small-caps" }}
      >
        Advanced Options
      </Typography>
      <Stack spacing={1}>
        <Box id="tech-base-radio">
          <FormControl component="fieldset">
            <FormLabel component="legend" id="techbase-radio-group">
              <Typography>Choose Technology Base</Typography>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="techbase-radio-group"
              name="techbase-radio-group"
              onChange={handleTechBaseRadio}
              value={technologyBase}
            >
              <FormControlLabel
                value="Inner Sphere"
                control={<Radio />}
                label={
                  <Tooltip title={tooltips.techBase.innerSphere}>
                    <span>Inner Sphere</span>
                  </Tooltip>
                }
              />
              <FormControlLabel
                value="Clan"
                control={<Radio />}
                label={
                  <Tooltip title={tooltips.techBase.clan}>
                    <span>Clan</span>
                  </Tooltip>
                }
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box id="chassis-type-radio">
          <FormControl component="fieldset">
            <FormLabel id="chassistype-radio-group" component="legend">
              <Typography>Choose Chassis Type</Typography>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="chassistype-radio-group"
              name="chassistype-radio-group"
              onChange={handleChassisTypeRadio}
              value={chassisType}
            >
              <FormControlLabel
                value="Bipedal"
                control={<Radio />}
                label={
                  <Tooltip title={tooltips.chassisType.bipedal}>
                    <span>Bipedal</span>
                  </Tooltip>
                }
              />
              <FormControlLabel
                value="Quad"
                control={<Radio />}
                label={
                  <Tooltip title={tooltips.chassisType.quad}>
                    <span>Quad</span>
                  </Tooltip>
                }
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Stack>
    </StyledAdvancedOptionsWrapper>
  );
};

export default React.memo(AdvancedMechData);
