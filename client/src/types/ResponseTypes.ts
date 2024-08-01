export interface Cabins {
  id?: number;
  Data: CabinResponse;
}
export interface CabinResponse {
  id?: number;
  created_at?: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: File | string | File[];
}
export interface ApiResponseProps {
  DataName: string;
  queryFn: () => void;
}
export interface DeleteApiResponseProps<T> {
  queryKey: string | string[];
  FN: (data: T) => Promise<unknown>; // Adjust the return type as needed
  loading: string;
  success: string;
  error: string;
  reset?: () => void;
  setOpen?: (value: boolean) => void;
}
export interface ICFN {
  setOpen: (open: boolean) => void;
  editCabins?: CabinResponse;
}
