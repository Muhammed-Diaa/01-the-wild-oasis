import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { ApiGetResponse } from "../../utils/ApiResponses";
import {
  getBookingsAfterDate,
  getStaysAfterDate,
} from "../../services/apiBookings";
import { Booking } from "../../types/ResponseTypes";

export const useRecentBookingData = () => {
  const [searshParams] = useSearchParams();
  const params = searshParams.get("last") ?? 7;
  const status =
    params === "last-7-days" ? 7 : params === "last-30-days" ? 30 : 90;

  const queryDate = subDays(new Date(), +status).toISOString();

  const { data } = ApiGetResponse({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${status}`],
  });
  const Booking = data as Booking[];

  return { Booking };
};
export const useRecentStaysData = () => {
  const [searshParams] = useSearchParams();
  const params = searshParams.get("last") ?? "last-7-days";
  const status = +params.split("-")[1];

  const queryDate = subDays(new Date(), +status).toISOString();

  const { data: stays } = ApiGetResponse({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["bookings", `${status}`],
  });

  const confirmedStays = stays?.filter(
    (stay: any) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { confirmedStays, status };
};
