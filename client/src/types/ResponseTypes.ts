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
  image: string | File | File[];
}
export interface ApiResponseProps {
  queryKey: string;
  queryFn: () => void;
}
export interface DeleteApiResponseProps<T> {
  FunctionName: string;
  queryKey: string | string[];
  FN: (data: T) => Promise<unknown>;
  reset?: () => void;
  setOpen?: (value: boolean) => void;
  onError?: (value: boolean) => void;
}
export interface ICFN {
  setOpen: (open: boolean) => void;
  editCabins?: CabinResponse;
}
export interface MutationResult {
  mutate: (data: Cabins) => void;
  isPending: boolean;
}
export interface ConfirmDeleteProps {
  resourceName: string;
  onConfirm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled: boolean;
  setOpen: (open: boolean) => void;
}
export interface Settings {
  id?: number;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}
