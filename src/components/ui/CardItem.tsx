import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Divider, Grid, IconButton, Rating } from "@mui/material";
import { Product } from "../../interfaces/product";
import { ChipsSize } from "./ChipsSize";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCartStore } from "../../store/cartStore";
import { useUiStore } from "../../store/uiStore";

interface Props {
  product: Product;
}

export const CardItem = ({ product }: Props) => {
  const colorRating =
    product?.difficulty <= 2
      ? "green"
      : product?.difficulty <= 4
      ? ""
      : "#6e0000";

  const { addToCart, items } = useCartStore();

  const { openDetailCart } = useUiStore();
  return (
    <Box className="itemAos" data-aos="fade-up">
      <Card>
        <CardMedia
          className="cardMediaProduct"
          component="img"
          alt={product.name}
          height="200"
          image={product.image}
        />
        <CardContent sx={{ maxWidth: "100%" }}>
          <Box /* height={70} */>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Divider />
          </Box>
          <Box sx={{ mt: 1, height: 70 }}>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </Box>

          <Grid container columnSpacing={2}>
            <Grid sx={{ justifyItems: "left" }} item xs={6}>
              <Typography variant="overline">Tamaño</Typography>
            </Grid>
            <Grid item xs={6}>
              <ChipsSize size={product.size} />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="overline">Dificultad</Typography>
            </Grid>
            <Grid item xs={6}>
              <Rating
                size="small"
                name="read-only"
                value={product.difficulty}
                readOnly
                sx={{ color: colorRating }}
              />
            </Grid>
            <Grid item xs={12} display={"flex"} justifyContent={"end"}>
              <Typography variant="caption" sx={{ opacity: 0.5, mr: 2.5 }}>
                {product.inStock} en stock
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />

        <CardActions sx={{ justifyContent: "end" }}>
          <IconButton
            aria-label="add_cart_card"
            disabled={
              product.inStock === 0 ||
              items.find((item) => item.id === product.id)?.quantity ===
                product.inStock
            }
            onClick={() => {
              if (!items.some((item) => item.id === product.id)) {
                openDetailCart();
              }
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image,
                inStock: product.inStock,
              });
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
};
