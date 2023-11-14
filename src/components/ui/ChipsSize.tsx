import { Size } from "../../interfaces/product";
import { Chip } from "@mui/material";

const chipSizes = {
  XS: "Extra pequeña ",
  S: "Pequeña",
  M: "Mediana",
  L: "Grande",
  XL: "Extra Grande",
};

interface Props {
  size: Size;
}

export const ChipsSize = ({ size: sizeValue }: Props) => (
  <Chip label={chipSizes[sizeValue]} variant={"filled"} />
);
