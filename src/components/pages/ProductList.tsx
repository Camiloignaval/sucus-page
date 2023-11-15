import { Box, Card } from "@mui/material";
import { exampleCards } from "../../data/exampleCards";
import { CardItem } from "../ui/CardItem";

export const ProductList = () => {
  return (
    <>
      <Box className="contAos">
        <Card className="cardContentList">
          {exampleCards.map((product) => (
            //   <div className="itemAos" data-aos="fade-up">
            <Box className="cardItem">
              <CardItem key={product.id} product={product} />
            </Box>
            //   </div>
          ))}
        </Card>
      </Box>
    </>
  );
};
