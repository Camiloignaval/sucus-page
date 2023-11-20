import { PaletteMode, createTheme } from "@mui/material";
import { useEffect, useState } from "react";

export const useDefineTheme = () => {
  const [themeMode, setThemeMode] = useState<PaletteMode | undefined>("light");

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: themeMode !== "dark" ? "#202124" : "#f6f5ef", // Color principal en modo claro
      },
      secondary: {
        main: themeMode !== "dark" ? "#000" : "#000", // Color principal en modo claro
      },
      background: {
        default: themeMode === "dark" ? "#202124" : "#f6f5ef", // Color de fondo predeterminado
        paper: themeMode === "dark" ? "#191a1c" : "#f6f5ef", // Color de fondo para los elementos de papel, como tarjetas
      },
    },
  });

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    setThemeMode(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  }, []);

  return { theme, toggleTheme };
};
