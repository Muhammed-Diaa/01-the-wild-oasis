import Filter from "../context/Filter";
import BookingTable from "../features/bookings/BookingTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Meta from "../utils/Meta";

function Bookings() {
  return (
    <Meta title="Bookings">
      <Row type="row">
        <Heading as="h1">All bookings</Heading>
        <Filter FilterOPtions="status" defaultFilter="All">
          <Filter.Button value="All" />
          <Filter.Button value="Checked In" />
          <Filter.Button value="checked out" />
          <Filter.Button value="unconfirmed" />
          <Filter.Sort
            options={[
              { value: "startDate-desc", label: "Sort by date ( recent )" },
              { value: "startDate-asc", label: "Sort by date ( earlier )" },
              { value: "totalPrice-desc", label: "Sort by amount ( high )" },
              { value: "totalPrice-asc", label: "Sort by amount ( low )" },
            ]}
          />
        </Filter>
      </Row>
      <BookingTable />
    </Meta>
  );
}

export default Bookings;
