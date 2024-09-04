import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { CabinResponse } from "../../types/ResponseTypes";
import { ApiGetResponse } from "../../utils/ApiResponses";
import { getCabins } from "../../services/apiCabins";
import Table from "../../context/Table";
import { useSearchParams } from "react-router-dom";
import Menu from "../../context/Menu";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../utils/constants";
import { useQueryClient } from "@tanstack/react-query";

const CabinTable = () => {
  // const [searchParams] = useSearchParams();
  // const queryClient = useQueryClient();
  // const filtering = searchParams.get("discount") || "";
  // const sort = searchParams.get("sortBy") || "";
  // const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  // const [field, diraction] = sort.split("-");
  // const filter =
  //   filtering === "all" ? undefined : { field: "status", value: filtering };
  // const sortBy = { field, diraction };
  // const { data, isPending, error, count } = ApiGetResponse({
  //   queryKey: ["cabins", filter, sortBy, page],
  //   queryFn: () => getCabins({ page, filter, sortBy }),
  // });

  // const pageCount = Math.ceil(count / PAGE_SIZE);

  // queryClient.prefetchQuery({
  //   queryKey: [
  //     "cabins",
  //     filter,
  //     sortBy,
  //     page < pageCount ? page + 1 : page > 1 ? page - 1 : page,
  //   ],
  //   queryFn: () =>
  //     getCabins({
  //       filter,
  //       sortBy,
  //       page: page < pageCount ? page + 1 : page > 1 ? page - 1 : page,
  //     }),
  // });

  // const cabins = data ?? [];

  // if (error) return <div>Error: {error.message}</div>;

  // const query = searchParams.get("discount");
  // const sortBy = searchParams.get("sortBy") || "startDate-asc";

  // const filteredCabins = cabins.filter((cabin: CabinResponse) => {
  //   return query === "with-discount"
  //     ? cabin.discount > 0
  //     : query === "no-discount"
  //     ? cabin.discount === 0
  //     : cabin;
  // });

  // const [filed, diraction] = sortBy.split("-");
  // const modifire = diraction === "asc" ? 1 : -1;
  // filteredCabins.sort(
  //   (a: { [x: string]: number }, b: { [x: string]: number }) =>
  //     (a[filed] - b[filed]) * modifire
  // );
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const filtering = searchParams.get("discount") || "all";
  const sort = searchParams.get("sortBy") ?? "name-desc";
  const page = +(searchParams.get("page") ?? 1);
  const [field, diraction] = sort.split("-");

  const filter =
    filtering === "all" ? undefined : { field: "discount", value: filtering };
  const sortBy = { field, diraction };

  const { data, count, isPending } = ApiGetResponse({
    queryKey: ["cabins", filter, sortBy, page],
    queryFn: () => getCabins({ filter, sortBy, page }),
  });
  const pageCount = Math.ceil(count / PAGE_SIZE);

  queryClient.prefetchQuery({
    queryKey: [
      "cabins",
      filter,
      sortBy,
      page < pageCount ? page + 1 : page > 1 ? page - 1 : page,
    ],
    queryFn: () =>
      getCabins({
        filter,
        sortBy,
        page: page < pageCount ? page + 1 : page > 1 ? page - 1 : page,
      }),
  });
  const cabins = data;

  if (!cabins) return null;

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
        {isPending ? (
          <Spinner />
        ) : (
          <Table.Body
            data={cabins}
            render={(data: unknown) => {
              const cabin = data as CabinResponse;
              return <CabinRow key={cabin.id} Data={cabin} />;
            }}
          />
        )}
        <Table.Footer>
          {" "}
          <Pagination results={count} />
        </Table.Footer>
      </Table>
    </Menu>
  );
};
export default CabinTable;
