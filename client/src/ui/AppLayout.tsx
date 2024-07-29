import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideBar from "./SideBar";
import Header from "./Header";
const Main = styled.main`
  display: flex;
  height: 100svh;
`;
const Div = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
`;
const Outlay = styled.div`
  background-color: var(--color-grey-100);
  padding: 4rem 4.8rem 6.4rem;
  border-top-left-radius: 4rem;
`;
function AppLayout() {
  return (
    <Main>
      <SideBar />
      <Div>
        <Header />
        <Outlay>
          <Outlet />
        </Outlay>
      </Div>
    </Main>
  );
}

export default AppLayout;
