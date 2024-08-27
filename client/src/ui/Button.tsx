import styled, { css } from "styled-components";
import { ButtonFace } from "../types/ComponentsTypes";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};
const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    border: none;
    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
    &:focus {
      outline: none;
    }
  `,
  toggle: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: none;
    font-weight: 600;
    padding: 10px 16px;
    z-index: 2;
    border-radius: 0px;
    background-color: var(--color-grey-50);
    &:focus {
      outline: none;
    }
    &:hover {
      background-color: var(--color-grey-200);
    }
  `,
};
const width = {
  full: css`
    width: 100%;
  `,
};

const Button = styled.button<ButtonFace>`
  ${(props) => sizes[props.$size || "medium"]};
  ${(props) => variations[props.$variation || "primary"]};
  ${(props) => (props.$width === "full" ? width.full : null)};
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  /* width: 100%; */
  cursor: pointer;
`;
export default Button;
