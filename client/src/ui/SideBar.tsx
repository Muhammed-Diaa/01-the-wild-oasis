import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const Aside = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 0 3.2rem 2.4rem;
  width: 300px;
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
