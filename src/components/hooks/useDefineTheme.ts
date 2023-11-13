import { PaletteMode, createTheme } from "@mui/material";
import { useEffect, useState } from "react";

export const useDefineTheme = () => {
  const [themeMode, setThemeMode] = useState<PaletteMode | undefined>("light");

  const theme = createTheme({
    palette: {
      mode: themeMode,
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
