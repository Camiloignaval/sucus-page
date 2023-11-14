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
          xs: "absolute",
          sm: "inherit",
        },
        right: 80,
        top: 8,
      }}
    >
      <IconButton
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "#fff" }}
      >
        <StyledBadge badgeContent={2} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
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

        <Box sx={{ display: "flex", justifyContent: "end", m: 1, mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/cart")}
          >
            Ir a pagar
          </Button>
        </Box>
      </Menu>
    </Box>
  );
}
