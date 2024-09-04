import styled, { css } from "styled-components";
import { RowFace } from "../types/ComponentsTypes";

const rowType = {
  row: css`
    justify-content: space-between;
    align-items: center;
  `,
  column: css`
    flex-direction: column;
    gap: 1.6rem;
  `,
};

const Row = styled.div<RowFace>`
  display: flex;
  ${({ type }) => rowType[type || "column"]}
  padding: 2.4rem 4rem;
`;
export default Row;
