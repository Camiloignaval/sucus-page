export type Size = "XS" | "S" | "M" | "L" | "XL";

export type Product = {
  name: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  image: string;
  inStock: number;
  price: number;
  category: string;
  inOffer: boolean;
  offerPrice: number;
  size: Size;
  id: string;
};
