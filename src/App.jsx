import "./App.css";

import DisplayMech from "./components/Display/DisplayMech";
import CreateMechForm from "./components/Builder/CreateMechForm";
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline, IconButton, Stack } from "@mui/material";
import { useState } from "react";

import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { getTheme } from "./theme";
import logoImg from "./assets/BT_logo_transparent.png";
import Navbar from "./components/UI/Navbar";
import {
  StyledHeaderWrapper,
  StyledImageWrapper,
  StyledHeaderTitle,
  StyledFlexBox,
} from "./components/UI/Header.styles";
import { useEffect } from "react";

function App() {
  const [mode, setMode] = useState("light");
  const theme = getTheme(mode);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const mech = useSelector((state) => state.mech);

  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 50); // shrink after 50px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledHeaderWrapper ownerState={{ shrink }}>
        <Stack sx={{ width: "100%" }}>
          <StyledFlexBox>
            <StyledImageWrapper onClick={scrollToTop}>
              <img src={logoImg} alt="" />
              <StyledHeaderTitle component="h1" variant="h6">
                MechBuilder v0.1
              </StyledHeaderTitle>
            </StyledImageWrapper>
            <IconButton
              onClick={toggleMode}
              sx={{ marginLeft: "1rem", width: "2.5rem" }}
            >
              <FontAwesomeIcon icon={mode === "light" ? faSun : faMoon} />
            </IconButton>
          </StyledFlexBox>
          <Navbar />
        </Stack>
      </StyledHeaderWrapper>
      {/* Hint: 70px for AppBar/Header Height */}
      <Box sx={{ padding: "180px 1rem" }}>
        <Box id="container" sx={{ display: "flex" }}>
          <CreateMechForm />
          <DisplayMech mech={mech} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
