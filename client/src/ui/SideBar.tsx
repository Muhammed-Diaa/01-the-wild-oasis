import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const Aside = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 0 3.2rem 2.4rem;
  width: 300px;
  height: 100svh;
  display: grid;
  grid-template-rows: 120px 1fr;
`;

function SideBar() {
  return (
    <Aside>
      <Logo />
      <MainNav />
    </Aside>
  );
}

export default SideBar;
