import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { FC } from "react";
import { useNotiStack } from "../hooks/useNotiStack";

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
  const { showEnqueueSnackbar } = useNotiStack();

  return (
    <Box display="flex" alignItems="center">
      <IconButton
        disabled={isPossibleZero}
        onClick={() => {
          // setQuantity((prev) => prev - 1);
          if (currentValue === 1) {
            showEnqueueSnackbar({
              text: "¿Eliminar producto del carrito?",
              isAction: true,
              functionToExecute: () => removeQuantity(),
              variant: "default",
              preventDuplicate: true,
              anchorOrigin: { vertical: "bottom", horizontal: "right" },
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
