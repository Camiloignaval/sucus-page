import {
  Backdrop,
  Badge,
  BadgeProps,
  Box,
  IconButton,
  styled,
} from "@mui/material";
import "./cart.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { motion } from "framer-motion";
import { useCartStore } from "../../../store/cartStore";
import { useShowDetailCard } from "../../hooks/useShowDetailCard";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function CartPopUp() {
  const { showDetailCart, handleClick, CardDetail } = useShowDetailCard();

  const { getTotalQuantity } = useCartStore();

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
            zIndex: 11,
          }}
        >
          <StyledBadge badgeContent={getTotalQuantity()} color={"secondary"}>
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </motion.div>
      {showDetailCart && <CardDetail />}
      <Backdrop
        sx={{
          width: "100vw",
          height: "100vh",
          color: "#fff",
          zIndex: () => 10,
        }}
        open={showDetailCart}
      />
    </Box>
  );
}
