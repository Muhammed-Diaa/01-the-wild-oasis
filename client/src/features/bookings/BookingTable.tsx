import BookingRow from "./BookingRow";
import Table from "../../context/Table";
import Menus from "../../context/Menu";
import { Booking } from "../../types/ResponseTypes";
import { getBooking } from "../../services/apiBookings";
import { ApiGetResponse } from "../../utils/ApiResponses";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";

function BookingTable() {
  const [searchParams] = useSearchParams();
  const filtering = searchParams.get("status");
  const sort = searchParams.get("sortBy") || "startDate-asc";
  const { data, isPending } = ApiGetResponse({
    queryKey: "bookings",
    queryFn: getBooking,
  });
  const bookings = data as unknown as Booking[];
  if (isPending) return <Spinner />;
  if (!bookings) return null;
  const BookingFilter = bookings.filter((booking: Booking) => {
    return filtering === "checked-in"
      ? booking.status === "checked-in"
      : filtering === "checked-out"
      ? booking.status === "checked-out"
      : filtering === "unconfirmed"
      ? booking.status === "unconfirmed"
      : booking;
  });
  // console.log(BookingFilter);
  // const [filed, diraction] = sort.split("-");
  // const modifire = diraction === "asc" ? 1 : -1;
  // const SortBooking = BookingFilter.sort(
  //   (a, b) => (a[filed] - b[filed]) * modifire
  // );

  return (
    <Menus>
      <Table $columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={BookingFilter}
          render={(data: unknown) => {
            const booking = data as Booking;
            return <BookingRow key={booking.id} booking={booking} />;
          }}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
