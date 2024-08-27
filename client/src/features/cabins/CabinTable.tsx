import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { CabinResponse } from "../../types/ResponseTypes";
import { ApiGetResponse } from "../../utils/ApiResponses";
import { getCabins } from "../../services/apiCabins";
import Table from "../../context/Table";
import { useSearchParams } from "react-router-dom";
import Menu from "../../context/Menu";

const CabinTable = () => {
  const [searchParams] = useSearchParams();
  const { data, isPending, error } = ApiGetResponse({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const cabins = data ?? [];

  if (isPending) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  const query = searchParams.get("discount");
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const filteredCabins = cabins.filter((cabin: CabinResponse) => {
    return query === "with-discount"
      ? cabin.discount > 0
      : query === "no-discount"
      ? cabin.discount === 0
      : cabin;
  });

  const [filed, diraction] = sortBy.split("-");
  const modifire = diraction === "asc" ? 1 : -1;
  filteredCabins.sort(
    (a: { [x: string]: number }, b: { [x: string]: number }) =>
      (a[filed] - b[filed]) * modifire
  );

  return (
    <Menu>
      <Table $columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabins</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Total Price</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(data: unknown) => {
            const cabin = data as CabinResponse;
            return <CabinRow key={cabin.id} Data={cabin} />;
          }}
        />
        <Table.Footer />
      </Table>
    </Menu>
  );
};
export default CabinTable;
