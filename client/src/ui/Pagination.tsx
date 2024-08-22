import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;
const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;
const PaginationButton = styled.button<{ $active: "true" | "false" }>`
  background-color: ${({ $active }) =>
    $active === "true" ? "var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${({ $active }) =>
    $active === "true" ? " var(--color-brand-50)" : "inherit"};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

type PaginationProps = {
  results: number;
  pageSize?: number;
  page?: number;
  onPageChange?: () => void;
};
const PAGE_SIZE = 10;

const Pagination = ({ results }: PaginationProps) => {
  const [searchedPage, setSearchedPage] = useSearchParams();
  const currentPage = Number(searchedPage.get("page")) || 1;
  const pageCount = Math.ceil(results / PAGE_SIZE);
  const NextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchedPage.set("page", next.toString());
    setSearchedPage(searchedPage);
  };
  const PrevPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchedPage.set("page", prev.toString());
    setSearchedPage(searchedPage);
  };

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to
        <span>
          {currentPage === pageCount ? results : PAGE_SIZE * currentPage}
        </span>{" "}
        of <span>{results}</span> results
      </P>
      <Buttons>
        <PaginationButton
          $active="true"
          onClick={PrevPage}
          disabled={1 === currentPage}
        >
          <HiChevronLeft />
          Previous
        </PaginationButton>
        <PaginationButton
          $active="true"
          onClick={NextPage}
          disabled={currentPage === pageCount}
        >
          next
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
};
export default Pagination;
