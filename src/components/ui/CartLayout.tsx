import lateralSucus from "../../assets/sucus_lateral.png";
import "../../App.css";
import { Box, ThemeProvider } from "@mui/material";
import ToggleThemeButton from "./ToggleThemeButton";
import DrawerAppBar from "./NavBar";
import { useDefineTheme } from "../hooks/useDefineTheme";
import { Outlet } from "react-router-dom";

export const CartLayout = () => {
  const { theme, toggleTheme } = useDefineTheme();

  return (
    <ThemeProvider theme={theme}>
      <ToggleThemeButton onToggle={toggleTheme} />
      <DrawerAppBar />

      <Box className="contenedorBkg">
        <img className="imgLateral" src={lateralSucus} alt="Imagen Lateral" />
      </Box>
      <Box sx={{ margin: "80px" }}>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};
