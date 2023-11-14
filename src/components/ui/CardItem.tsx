import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid, Rating } from "@mui/material";
import { Product } from "../../interfaces/product";
import { ChipsSize } from "./ChipsSize";

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

  return (
    <Box className="itemAos" data-aos="fade-up">
      <Card sx={{ width: 300 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={product.image}
        />
        <CardContent>
          <Box height={70}>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
          </Box>
          <Box height={70}>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>{" "}
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>Tamaño</Typography>
            </Grid>
            <Grid item xs={6}>
              <ChipsSize size={product.size} />
            </Grid>

            <Grid item xs={6}>
              <Typography>Dificultad</Typography>
            </Grid>
            <Grid item xs={6}>
              <Rating
                name="read-only"
                value={product.difficulty}
                readOnly
                sx={{ color: colorRating }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
};
