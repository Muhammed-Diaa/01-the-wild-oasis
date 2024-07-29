import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Cabins() {
  return (
    <>
      <Row type="row">
        <Heading as="h1">All cabins</Heading>
        <p>TEST</p>
        {/* <img src={data[0]?.image} alt="" /> */}
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
