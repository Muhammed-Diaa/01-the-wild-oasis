import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { CabinResponse } from "../../types/ResponseTypes";
import { ApiGetResponse } from "../../utils/ApiResponses";
import { getCabins } from "../../services/apiCabins";
import Table from "../../context/Table";
import { useSearchParams } from "react-router-dom";

const CabinTable = () => {
  const [searchParams] = useSearchParams();
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

  const query = searchParams.get("discount");
  const sortBy = searchParams.get("sortBy");

  const filteredCabins = cabins.filter((cabin: CabinResponse) => {
    return query === "with-discount"
      ? cabin.discount > 0
      : query === "no-discount"
      ? cabin.discount === 0
      : cabin;
  });

  const [filed, diraction] = sortBy?.split("-") || ["name", "asc"];
  const modifire = diraction === "asc" ? 1 : -1;
  const SortCabin = filteredCabins.sort((a, b) => {
    return a[filed] - b[filed] * modifire;
  });
  console.log(filed, diraction, SortCabin);

  return (
    <Table $columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabins</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={SortCabin}
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
