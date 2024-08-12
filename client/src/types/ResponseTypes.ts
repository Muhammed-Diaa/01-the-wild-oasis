export interface ICFN {
  editCabins?: CabinResponse;
  onCloseModal?: () => void;
}
export interface Cabins {
  id?: number;
  Data: CabinResponse;
}
export interface Booking {
  id: any;
  created_at: any;
  startDate: any;
  endDate: any;
  numNights: any;
  numGuests: any;
  totalPrice: any;
  status: any;
  guests: {
    fullName: any;
    email: any;
  };
  cabins: {
    name: any;
  };
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
export interface IUDApiResponseProps<T> {
  FunctionName: string;
  queryKey: string | string[];
  FN: (data: T) => Promise<unknown>;
  reset?: () => void;
  onCloseModal?: () => void;
}
export interface MutationResult {
  mutate: (data: Cabins) => void;
  isPending: boolean;
  status: string;
}
export interface MutationResultN {
  mutate: (data: number | Cabins) => void;
  isPending: boolean;
  status: string;
}
export interface ConfirmDeleteProps {
  resourceName: string;
  onConfirm: () => void;
  isPending: boolean;
  status: string;
}
export interface Settings {
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}
