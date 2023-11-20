import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { FC } from "react";
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from "notistack";

interface Props {
  currentValue: number;
  maxValue?: number;
  addQuantity?: () => void;
  removeQuantity?: () => void;
  isPossibleZero?: boolean;
  blockButtonPlus?: boolean;
}

export const ItemCounter: FC<Props> = ({
  currentValue,
  maxValue = undefined,
  addQuantity = () => {},
  removeQuantity = () => {},
  isPossibleZero = false,
  blockButtonPlus = false,
}) => {
  const action = (snackbarId: SnackbarKey) => (
    <Box sx={{ my: 1 }}>
      <Button
        sx={{ mr: 1 }}
        variant="outlined"
        // color="warning"
        onClick={() => {
          removeQuantity();
          closeSnackbar(snackbarId);
        }}
      >
        Eliminar
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
  return (
    <Box display="flex" alignItems="center">
      <IconButton
        disabled={isPossibleZero}
        onClick={() => {
          // setQuantity((prev) => prev - 1);
          if (currentValue === 1) {
            enqueueSnackbar("Item será eliminado del carrito", {
              // persist: true,
              action,
              variant: "default",
              preventDuplicate: true,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
              autoHideDuration: 10000,
            });
          } else {
            removeQuantity();
          }
        }}
      >
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center" }}>
        {currentValue}
      </Typography>
      <IconButton
        disabled={
          blockButtonPlus ? true : maxValue ? maxValue === currentValue : false
        }
        onClick={() => {
          // setQuantity((prev) => prev + 1);
          addQuantity();
        }}
      >
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
