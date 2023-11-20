import * as React from "react";
import Button from "@mui/material/Button";
import {
  Badge,
  BadgeProps,
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { motion } from "framer-motion";
import { useCartStore } from "../../../store/cartStore";
import { ItemCounter } from "../../ui/ItemCounter";
import CancelIcon from "@mui/icons-material/Cancel";
import { milesSeparator } from "../../../helpers/formatNumber";
import sucuTriste from "../../../assets/sucutriste.png";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function CartPopUp() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState<boolean>(false);

  // const open = Boolean(anchorEl);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClose = () => setOpen(false);

  const {
    getTotalQuantity,
    items,
    addToCart,
    removeOneFromCart,
    removeAllFromCart,
  } = useCartStore();

  return (
    <Box
      sx={{
        position: {
          xs: "relative",
          sm: "inherit",
        },
        right: {
          xs: 5,
          sm: 0,
        },
        top: 0,
      }}
    >
      <motion.div whileTap={{ scale: 0.8 }}>
        <IconButton
          className="cartIconButton"
          onClick={handleClick}
          sx={{
            color: "#fff",
          }}
        >
          <StyledBadge badgeContent={getTotalQuantity()} color={"secondary"}>
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </motion.div>
      {open && (
        <Card sx={{ position: "absolute", right: 2, minWidth: 300 }}>
          <Typography sx={{ marginX: 5, marginY: 2 }}>
            Productos en carrito
          </Typography>
          <IconButton
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
                <Grid item xs={4}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ maxWidth: "60px" }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2">{item.name}</Typography>
                </Grid>
                <Grid item xs={4}>
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
                      item.quantity > 1
                        ? removeOneFromCart(item.id)
                        : removeAllFromCart(item.id);
                    }}
                    // isPossibleZero={item.quantity <= 1}
                    maxValue={item.inStock}
                  />
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

          <Box
            sx={{ display: "flex", justifyContent: "end", m: 3, mr: 2, mt: 2 }}
          >
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
      )}
    </Box>
  );
}
