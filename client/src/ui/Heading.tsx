import styled, { css } from "styled-components";
import { HeadingFace } from "../types/ComponentsTypes";

const HType = {
  h1: css`
    font-size: 3rem;
    font-weight: 600;
  `,
  h2: css`
    font-size: 2rem;
    font-weight: 600;
  `,
  h3: css`
    font-size: 2rem;
    font-weight: 500;
  `,
};

const Heading = styled.h1<HeadingFace>`
  ${(props) => HType[(props.as as keyof typeof HType) || "h1"]}
`;
export default Heading;
