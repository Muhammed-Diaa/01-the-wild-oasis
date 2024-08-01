import styled from "styled-components";
import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.6rem;
`;
function Cabins() {
  return (
    <Container>
      <Row type="row">
        <Heading as="h1">All cabins</Heading>
        <p>TEST</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </Container>
  );
}

export default Cabins;
