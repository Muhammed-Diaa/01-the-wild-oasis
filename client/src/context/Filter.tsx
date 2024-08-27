import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { Children } from "../types/ComponentsTypes";
import Menus from "./Menu";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;
const selected = {
  active: css`
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  `,
  nonActive: css``,
};
const FilterButton = styled.button<{ $active?: string; $size?: string }>`
  background-color: var(--color-grey-0);
  border: none;

  ${({ $active }) => $active && JSON.parse($active) && selected.active}
  ${({ $size }) =>
    $size === "small"
      ? css`
          font-size: 1rem;
          width: 100%;
          text-align: start;
        `
      : css`
          font-size: 1.4rem;
        `}
  border-radius: var(--border-radius-sm);
  font-weight: 500;

  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
  &:disabled {
    cursor: pointer;
  }
`;

const FilterContext = createContext<{
  filter: string;
  sort: string;
  setFilter: (filter: string) => void;
  setSort: (sort: string) => void;
}>({
  filter: "all",
  sort: "",
  setFilter: () => {},
  setSort: () => {},
});

const useFilter = () => {
  return useContext(FilterContext);
};
const Filter = ({
  children,
  FilterOPtions,
}: Children & { FilterOPtions: string }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get(FilterOPtions) || "all";
  const sort = searchParams.get("sortBy") || "startDate-desc";
  const setFilter = (filter: string) => {
    searchParams.set(FilterOPtions, filter);
    setSearchParams(searchParams);
  };
  const setSort = (sort: string) => {
    searchParams.set("sortBy", sort);
    setSearchParams(searchParams);
  };

  return (
    <FilterContext.Provider value={{ filter, setFilter, setSort, sort }}>
      <StyledFilter>{children}</StyledFilter>
    </FilterContext.Provider>
  );
};
const Btn = ({ value }: { value: string }) => {
  const { filter, setFilter } = useFilter();
  const type = value.toLowerCase().split(" ").join("-");
  return (
    <FilterButton
      $active={JSON.stringify(filter === type)}
      disabled={filter === type}
      onClick={() => setFilter(type)}
    >
      {value}
    </FilterButton>
  );
};
const Sort = ({ options }: { options: { value: string; label: string }[] }) => {
  const { setSort } = useFilter();
  const [name, setName] = useState("Sort");
  return (
    <Menus>
      <Menus.Toggle Btn={name} id={"sort"}>
        <Menus.List width="sort" id={"sort"}>
          {options.map((option) => (
            <Menus.Button
              key={option.label}
              onClick={() => {
                setName(option.label);
                setSort(option.value);
              }}
            >
              {option.label}
            </Menus.Button>
          ))}
        </Menus.List>
      </Menus.Toggle>
    </Menus>
  );
};

Filter.Button = Btn;
Filter.Sort = Sort;

export default Filter;
