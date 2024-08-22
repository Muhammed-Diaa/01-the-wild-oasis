import BookingRow from "./BookingRow";
import Table from "../../context/Table";
import Menus from "../../context/Menu";
import { Booking } from "../../types/ResponseTypes";
import { getBooking } from "../../services/apiBookings";
import { ApiGetResponse } from "../../utils/ApiResponses";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const [searchParams] = useSearchParams();

  const filtering = searchParams.get("status") || "all";
  const sort = searchParams.get("sortBy") || "startDate-asc";
  const page = +(searchParams.get("page") ?? 1);
  const [field, diraction] = sort.split("-");

  const filter =
    filtering === "all" ? undefined : { field: "status", value: filtering };
  const sortBy = { field, diraction };

  const { data, count, isPending } = ApiGetResponse({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBooking({ filter, sortBy, page }),
  });
  const bookings = data as unknown as Booking[];
  if (isPending) return <Spinner />;
  if (!bookings) return null;

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
          data={bookings}
          render={(data: unknown) => {
            const booking = data as Booking;
            return <BookingRow key={booking.id} booking={booking} />;
          }}
        />
        <Table.Footer>
          <Pagination results={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
