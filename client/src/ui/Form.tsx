import styled, { css } from "styled-components";
import { Form } from "react-router-dom";

const type = {
  modal: css`
    width: 80rem;
  `,
  default: css`
    padding: 2.4rem 4rem;
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
  `,
};

const FormData = styled(Form)<{ $type?: keyof typeof type }>`
  ${(props) => type[props.$type || "default"]}

  overflow: hidden;
  font-size: 1.4rem;
`;

export default FormData;
