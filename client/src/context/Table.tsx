import { createContext, useContext } from "react";
import styled from "styled-components";
import { CabinResponse } from "../types/ResponseTypes";

interface TableProps {
  columns: string;
  children: React.ReactNode;
}
interface Children {
  children: React.ReactNode;
}

const TabelContext = createContext<{
  columns: string;
}>({ columns: "" });

const useTable = () => {
  return useContext(TabelContext);
};

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
`;
const CommonRow = styled.div<{ columns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;
const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;
const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;
const StyledBody = styled.section`
  margin: 0.4rem 0;
`;
const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;
const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const Table = ({ children, columns }: TableProps) => {
  return (
    <TabelContext.Provider value={{ columns }}>
      <StyledTable>{children}</StyledTable>
    </TabelContext.Provider>
  );
};
const Header = ({ children }: Children) => {
  const { columns } = useTable();
  return (
    <StyledHeader role="row" as="header" columns={columns}>
      {children}
    </StyledHeader>
  );
};
const Row = ({ children }: Children) => {
  const { columns } = useTable();
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
};

const Body = ({
  data,
  render,
}: {
  data: CabinResponse[];
  render: (cabin: CabinResponse) => JSX.Element;
}) => {
  if (!data || data.length === 0)
    return <Empty>No data to show at the moment</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
};

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;
export default Table;
