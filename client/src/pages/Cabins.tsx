import styled from "styled-components";
import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Meta from "../utils/Meta";
import Filter from "../context/Filter";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.6rem;
`;
function Cabins() {
  return (
    <Meta title="Cabins">
      <Container>
        <Row type="row">
          <Heading as="h1">All cabins</Heading>
          <Filter>
            <Filter.Button value="All" />
            <Filter.Button value="No Discount" />
            <Filter.Button value="With Discount" />

            <Filter.Sort
              options={[
                { value: "name-asc", label: "Sort by name (A-Z)" },
                { value: "name-desc", label: "Sort by name (Z-A)" },
                {
                  value: "regularPrice-asc",
                  label: "Sort by price (low)",
                },
                {
                  value: "regularPrice-desc",
                  label: "Sort by price (high)",
                },
                {
                  value: "maxCapacity-asc",
                  label: "Sort by capacity (low)",
                },
                {
                  value: "maxCapacity-desc",
                  label: "Sort by capacity (high)",
                },
              ]}
            />
          </Filter>
        </Row>
        <Row>
          <CabinTable />
        </Row>
      </Container>
    </Meta>
  );
}

export default Cabins;
