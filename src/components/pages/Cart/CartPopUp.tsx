import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import {
  Badge,
  BadgeProps,
  Box,
  Divider,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { motion } from "framer-motion";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function CartPopUp() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        position: {
          xs: "relative",
          sm: "inherit",
        },
        right: {
          xs: 75,
          sm: 0,
        },
        top: 0,
      }}
    >
      <motion.div whileTap={{ scale: 0.8 }}>
        <IconButton
          className="cartIconButton"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            color: "#fff",
          }}
        >
          <StyledBadge badgeContent={2} color={"secondary"}>
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </motion.div>
      <Menu
        id="basic-menu-cart"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Typography sx={{ marginX: 5, marginY: 2 }}>
          Productos en carrito
        </Typography>
        <Divider />
        <ul>
          <li>sucu 1</li>
          <li>sucu 2</li>
        </ul>
        <Divider />

        <Box
          sx={{ display: "flex", justifyContent: "end", m: 1, mr: 2, mt: 2 }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/cart")}
          >
            Ir a pagar
          </Button>
        </Box>
      </Menu>
    </Box>
  );
}
