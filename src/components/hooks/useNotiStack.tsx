import { SnackbarKey, closeSnackbar, enqueueSnackbar } from "notistack";
import { Box, Button } from "@mui/material";

interface IAction {
  snackbarId: SnackbarKey;
  functionToExecute: () => void;
}

interface IShowEnqueueSnackbar {
  isAction: boolean;
  text: string;
  functionToExecute?: () => void | undefined;
  variant?: "default" | "error" | "success" | "warning" | "info" | "success";
  preventDuplicate?: boolean;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  autoHideDuration?: number;
}

const action = ({ snackbarId, functionToExecute }: IAction) => (
  <Box sx={{ my: 1 }}>
    <Button
      sx={{ mr: 1 }}
      variant="outlined"
      // color="warning"
      onClick={() => {
        closeSnackbar(snackbarId);
        functionToExecute();
      }}
    >
      Confirmar
    </Button>
    <Button
      variant="outlined"
      // color="success"
      onClick={() => {
        closeSnackbar(snackbarId);
      }}
    >
      Cancelar
    </Button>
  </Box>
);

export const useNotiStack = () => {
  const showEnqueueSnackbar = ({
    isAction,
    text,
    functionToExecute = () => {},
    variant = "default",
    preventDuplicate = false,
    anchorOrigin = {
      vertical: "bottom",
      horizontal: "right",
    },
    autoHideDuration = 10000,
  }: IShowEnqueueSnackbar) => {
    enqueueSnackbar(text, {
      // persist: true,
      action: (snackbarId: SnackbarKey) =>
        isAction && action({ snackbarId, functionToExecute }),
      variant,
      preventDuplicate,
      anchorOrigin,
      autoHideDuration,
    });
  };
  return { showEnqueueSnackbar };
};
