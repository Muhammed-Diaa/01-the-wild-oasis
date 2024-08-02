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
  grid-template-rows: 70px 1fr;
  width: 100%;
`;
const Outlay = styled.div`
  padding: 4rem 4.8rem 6.4rem;
  border-top-left-radius: 2rem;
  background-color: var(--color-grey-100);
  /* text-align: -webkit-center; */
`;

const MaxWidth = styled.div`
  margin: 0 auto;
  max-width: 120rem;
`;
function AppLayout() {
  return (
    <Main>
      <SideBar />
      <Div>
        <Header />
        <Outlay>
          <MaxWidth>
            <Outlet />
          </MaxWidth>
        </Outlay>
      </Div>
    </Main>
  );
}

export default AppLayout;
