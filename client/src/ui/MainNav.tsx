import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { NavBtnList } from "../utils/MapLists";
import CreateAndEditCabin from "../features/cabins/CreateAndEditCabin";
import Meta from "../utils/Meta";
import Menus from "../context/Menu";
import Modal from "../context/Modal";
import Button from "./Button";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
const Link = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
    border-top-left-radius: var(--border-radius-sm);
    border-bottom-left-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
const BtnDiv = styled.div`
  width: 100%;
  padding-right: 3.6rem;
`;
export default function MainNav() {
  const { pathname } = useLocation();

  return (
    <NavList>
      <Div>
        {NavBtnList.map((item, i) => (
          <Link key={i} to={item.path}>
            {<item.icon />}
            {item.name}
          </Link>
        ))}
      </Div>

      {pathname.startsWith("/cabins") && (
        <Meta title="Add Cabin">
          <Menus>
            <Modal>
              <BtnDiv>
                <Modal.Open opens={"create"}>
                  <Button $width="full">Add Cabin</Button>
                </Modal.Open>
              </BtnDiv>
              <Modal.Window name={"create"}>
                <CreateAndEditCabin />
              </Modal.Window>
            </Modal>
          </Menus>
        </Meta>
      )}
    </NavList>
  );
}
