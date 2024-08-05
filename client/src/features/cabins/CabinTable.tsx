import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { CabinResponse } from "../../types/ResponseTypes";
import { ApiGetResponse } from "../../utils/ApiResponses";
import { getCabins } from "../../services/apiCabins";
import Table from "../../context/Table";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

const CabinTable = () => {
  const {
    data: cabins = [],
    isPending,
    error,
  } = ApiGetResponse({
    queryKey: "cabins",
    queryFn: getCabins,
  });

  if (isPending) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;
  if (!cabins || !Array.isArray(cabins)) return null;

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabins</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={cabins}
        render={(cabin: CabinResponse) => (
          <CabinRow key={cabin.id} Data={cabin} />
        )}
      />
      <Table.Footer />
    </Table>
  );
};
export default CabinTable;
// { name?: string } |
