import BookingRow from "./BookingRow";
import Table from "../../context/Table";
import Menus from "../../context/Menu";

function BookingTable() {
  const bookings: unknown[] = [];

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
            const booking = data as [];
            return <BookingRow key={booking.id} booking={booking} />;
          }}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
