import { Box } from "@mui/material";
import { exampleCards } from "../../data/exampleCards";
import { CardItem } from "../ui/CardItem";

export const ProductList = () => {
  return (
    <>
      <Box className="contAos">
        {exampleCards.map((product) => (
          //   <div className="itemAos" data-aos="fade-up">
          <CardItem key={product.id} product={product} />
          //   </div>
        ))}
      </Box>
    </>
  );
};
