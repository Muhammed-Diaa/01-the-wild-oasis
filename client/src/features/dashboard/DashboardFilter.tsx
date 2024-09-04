import Filter from "../../context/Filter";

function DashboardFilter() {
  return (
    <Filter FilterOPtions="last" defaultFilter="last-7-days">
      <Filter.Button value="last 7 days" />
      <Filter.Button value="last 30 days" />
      <Filter.Button value="last 90 days" />
      {/* <Filter.Sort
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
            /> */}
    </Filter>
  );
}

export default DashboardFilter;
