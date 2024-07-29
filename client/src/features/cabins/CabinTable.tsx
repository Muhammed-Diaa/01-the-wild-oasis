import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import { CabinResponse } from "../../types/ResponseTypes";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const CabinTable = () => {
  const {
    data: cabins,
    isPending,
    error,
  } = useQuery<CabinResponse[]>({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  console.log(isPending);
  if (isPending) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Table>
        <TableHeader>
          <div></div>
          <div>Cabins</div>
          <div>Capcity</div>
          <div>Price</div>
          <div>discount</div>
          <div></div>
        </TableHeader>{" "}
        {/* {cabins.map((cabin) => (
          <CabinRow key={cabin.id} cabin={cabin} />
        ))} */}
        {[...Array(10)].map((_, cabin) => (
          <CabinRow key={cabin} Data={cabins[0]} />
        ))}
      </Table>
    </>
  );
};
export default CabinTable;
