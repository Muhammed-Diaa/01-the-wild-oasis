export interface HeadingFace {
  as?: "h1" | "h2" | "h3";
}
export interface ButtonFace {
  $size?: "small" | "medium" | "large";
  $variation?: "primary" | "secondary" | "danger";
}
export interface RowFace {
  type?: "row" | "column";
}
export type Inputs = {
  id?: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string | File[];
};
