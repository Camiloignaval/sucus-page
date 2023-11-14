// import React from "react";
import AOS from "aos";
import "../../App.css";
import "aos/dist/aos.css";
// import { CardItem } from "../ui/CardItem";
// import { Box } from "@mui/material";
import BasicTabs from "../ui/Tabs";
// import { exampleCards } from "../../data/exampleCards";

export const Home = () => {
  AOS.init({
    duration: 3000,
  });

  return (
    <>
      <BasicTabs />
      {/* <Box className="contAos">
        {exampleCards.map((product) => (
          //   <div className="itemAos" data-aos="fade-up">
          <CardItem key={product.id} product={product} />
          //   </div>
        ))}
      </Box> */}
    </>
  );
};
