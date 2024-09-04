import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { Booking } from "../../types/ResponseTypes";
import { formatCurrency } from "../../utils/helpers";
import { ApiGetResponse } from "../../utils/ApiResponses";
import { getCabins } from "../../services/apiCabins";

const Stats = ({
  status,
  bookings,
  confirmedStays,
}: {
  status: number;
  bookings: Booking[];
  confirmedStays: Booking[];
}) => {
  const { data } = ApiGetResponse({
    queryKey: ["cabins"],
    queryFn: () => getCabins({}),
  });

  const numBookings = bookings?.length;
  const numDays = confirmedStays?.length.toString();
  const numNights = Math.round(
    (confirmedStays?.reduce((acc, cur) => acc + cur?.numNights, 0) /
      (data?.length * status)) *
      100
  );

  const occupancy = !confirmedStays ? 0 : !numNights ? "0 %" : numNights + "%";
  const sales = !bookings
    ? 0
    : formatCurrency(bookings?.reduce((acc, cur) => acc + cur?.totalPrice, 0));
  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title={"Bookings"}
        color={"blue"}
        value={numBookings}
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title={"Sales"}
        color={"green"}
        value={sales}
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title={"Check ins"}
        color={"indigo"}
        value={numDays}
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title={"Occupancy rate"}
        color={"yellow"}
        value={occupancy}
      />
    </>
  );
};
export default Stats;
