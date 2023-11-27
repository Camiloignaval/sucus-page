import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { FC } from "react";
import { useNotiStack } from "../hooks/useNotiStack";
import { productCart, useCartStore } from "../../store/cartStore";
import { Product } from "../../interfaces/product";

interface Props {
  // currentValue: number;
  prod: productCart | Product;
  maxValue?: number;
  addQuantity?: () => void;
  removeQuantity?: () => void;
  isPossibleZero?: boolean;
  blockButtonPlus?: boolean;
}

export const ItemCounter: FC<Props> = ({
  prod,
  // maxValue = undefined,
  addQuantity = () => {},
  removeQuantity = () => {},
  isPossibleZero = false,
  // blockButtonPlus = false,
}) => {
  const currentValue = useCartStore((state) => state.getQuantityById(prod.id!));
  const disablePlus = currentValue === prod.inStock;
  const { showEnqueueSnackbar } = useNotiStack();

  return (
    <Box display="flex" alignItems="center">
      <IconButton
        aria-label="minusBtn"
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
      <Typography
        aria-label="qtyProduct"
        sx={{ width: 40, textAlign: "center" }}
      >
        {currentValue}
      </Typography>
      <IconButton
        aria-label="plusBtn"
        disabled={disablePlus}
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
