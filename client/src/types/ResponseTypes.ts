export interface Cabins {
  id?: number;
  Data: CabinResponse;
}
export interface CabinResponse {
  id: number;
  created_at: string;
  name: string;
  maxCapcity: number;
  regularPrine: number;
  discount: number;
  description: string;
  image: string;
}
