import Filter from "../context/Filter";
import BookingTable from "../features/bookings/BookingTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
  return (
    <>
      <Row type="row">
        <Heading as="h1">All bookings</Heading>
        <Filter FilterOPtions="status">
          <Filter.Button value="All" />
          <Filter.Button value="Checked In" />
          <Filter.Button value="checked out" />
          <Filter.Button value="unconfirmed" />
          <Filter.Sort
            options={[
              { value: "cabins.name-asc", label: "Sort by Name ( ↑ )" },
              { value: "cabins.name-desc", label: "Sort by Name ( ↓ )" },
              { value: "startDate-asc", label: "Sort by Date ( ↑ )" },
              { value: "startDate-desc", label: "Sort by Date ( ↓ )" },
              { value: "endDate-asc", label: "Sort by Date ( ↑ )" },
              { value: "endDate-desc", label: "Sort by Date ( ↓ )" },
              { value: "Price-asc", label: "Sort by Price ( ↑ )" },
              { value: "Price-desc", label: "Sort by Price ( ↓ )" },
            ]}
          />
        </Filter>
      </Row>
      <BookingTable />
    </>
  );
}

export default Bookings;
