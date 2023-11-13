import { useTheme } from "@mui/material";
import { MaterialUISwitch } from "./MuiSwitch";

interface Props {
  onToggle: () => void;
}

const ToggleThemeButton = ({ onToggle }: Props) => {
  const theme = useTheme();

  return (
    <>
      <MaterialUISwitch
        className="modeButton"
        sx={{ m: 1 }}
        onClick={onToggle}
        checked={theme.palette.mode === "dark"}
      />
    </>
  );
};

export default ToggleThemeButton;
