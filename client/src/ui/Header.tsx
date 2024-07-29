import styled from "styled-components";

const HeaderSyled = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
`;

function Header() {
  return <HeaderSyled>Header</HeaderSyled>;
}

export default Header;
