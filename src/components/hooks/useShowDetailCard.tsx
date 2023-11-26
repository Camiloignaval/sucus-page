import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { ItemCounter } from "../ui/ItemCounter";
import { milesSeparator } from "../../helpers/formatNumber";
import { useCartStore } from "../../store/cartStore";
import CancelIcon from "@mui/icons-material/Cancel";
import sucuTriste from "../../assets/sucutriste.png";
import { useNavigate } from "react-router-dom";
import { useUiStore } from "../../store/uiStore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNotiStack } from "./useNotiStack";

export const useShowDetailCard = () => {
  const { showDetailCart, openDetailCart, closeDetailCart } = useUiStore();

  const navigate = useNavigate();

  const { items, addToCart, removeOneFromCart, removeAllFromCart } =
    useCartStore();

  const { showEnqueueSnackbar } = useNotiStack();

  const handleClick = (): void => openDetailCart();

  const handleClose = (): void => closeDetailCart();

  const deleteFromCart = (id: string): void => {
    showEnqueueSnackbar({
      text: "¿Eliminar producto del carrito?",
      isAction: true,
      functionToExecute: () => removeAllFromCart(id),
      variant: "default",
      preventDuplicate: true,
      anchorOrigin: { vertical: "bottom", horizontal: "right" },
      autoHideDuration: 10000,
    });
  };

  const CardDetail = () => (
    <Card sx={{ position: "absolute", right: 2, minWidth: 330, zIndex: 11 }}>
      <Typography sx={{ marginX: 5, marginY: 2 }}>
        Productos en carrito
      </Typography>
      <IconButton
        aria-label="closeInfoCart"
        onClick={() => handleClose()}
        sx={{ position: "absolute", top: 8, right: 5 }}
      >
        <CancelIcon />
      </IconButton>
      <Divider />
      <Grid justifyContent={"center"} container columnGap={3} p={2}>
        {items.length === 0 && (
          <>
            <Typography variant="caption" sx={{ marginX: 5, marginY: 2 }}>
              No hay productos en el carrito
              {/* <SentimentVeryDissatisfiedIcon /> */}
            </Typography>
            <img src={sucuTriste} alt="Suculenta triste" />
          </>
        )}
        {items.map((item) => (
          <Grid
            item
            container
            xs={12}
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item xs={3.5}>
              <img
                src={item.image}
                alt={item.name}
                style={{ maxWidth: "60px" }}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">{item.name}</Typography>
            </Grid>
            <Grid item xs={3.5}>
              <ItemCounter
                currentValue={item.quantity}
                addQuantity={() =>
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                    inStock: item.inStock,
                  })
                }
                removeQuantity={() => {
                  removeOneFromCart(item.id);
                }}
                // isPossibleZero={item.quantity <= 1}
                maxValue={item.inStock}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={() => deleteFromCart(item.id)}>
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          ml: 3,
          mr: 2,
          mt: 1,
        }}
      >
        <Typography fontWeight={"bold"} variant="body1">
          Total
        </Typography>
        <Typography fontWeight={"bold"} variant="body1">
          $
          {milesSeparator({
            num: items.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            ),
          })}
        </Typography>
      </Box>
      <Divider />

      <Box sx={{ display: "flex", justifyContent: "end", m: 3, mr: 2, mt: 2 }}>
        <Button
          disabled={items.length === 0}
          variant="contained"
          color="success"
          fullWidth
          onClick={() => navigate("/cart")}
        >
          Ir a pagar
        </Button>
      </Box>
    </Card>
  );

  return { showDetailCart, handleClick, CardDetail };
};
