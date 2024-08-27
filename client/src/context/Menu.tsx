import styled, { css } from "styled-components";
import { createContext, Ref, useContext, useRef, useState } from "react";

import useOutsideClick from "../hooks/useOutsideClick";
import { MdKeyboardArrowDown, MdKeyboardArrowLeft } from "react-icons/md";

interface MenusContextType {
  openId: string;
  closeMenu: () => void;
  openMenu: (id: string) => void;
  clickRef: Ref<HTMLButtonElement>;
  listRef: Ref<HTMLUListElement>;
}

const Menu = styled.div`
  text-align: end;
  position: relative;
`;
const TextEnd = styled.div`
  display: flex;
  justify-content: end;
`;
const StyledToggle = styled.button<{ $btn: "true" | "false" }>`
  position: relative;
  border: none;
  background: inherit;
  ${({ $btn }) =>
    JSON.parse($btn)
      ? css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1.6rem;
          padding-left: 1.6rem;
          width: 223px;
          &:hover {
            background-color: var(--color-grey-100);
          }
        `
      : css`
          font-size: 2.6rem;
        `}

  /* cursor: default; */
  &:focus {
    outline: none;
  }
  & svg {
    cursor: pointer;
  }
`;
const StyledList = styled.ul<{ width?: "toggle" | "sort" }>`
  ${({ width }) =>
    width === "sort"
      ? css`
          width: 20rem;
        `
      : css`
          width: 14rem;
        `};
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 8;

  right: 20px;
  top: 26px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
`;
const StyledButton = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 1.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  /* font-size: 1.6rem; */
  & svg {
    margin-right: 1rem;
  }

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

const MenusContext = createContext<MenusContextType>({
  openId: "",
  closeMenu: () => {},
  openMenu: () => {},
  clickRef: null,
  listRef: null,
});

function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState("");
  const clickRef = useRef(null);
  const listRef = useRef(null);
  const closeMenu = () => setOpenId("");
  const openMenu = (id: string) => setOpenId(id);
  useOutsideClick(listRef, closeMenu, clickRef);
  return (
    <MenusContext.Provider
      value={{ openId, closeMenu, openMenu, clickRef, listRef }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({
  id,
  children,
  Btn,
}: {
  id: string;
  children: React.ReactElement;
  Btn: React.ReactElement | string;
}) {
  const { openId, openMenu, closeMenu, clickRef } = useContext(MenusContext);

  function handleClick() {
    openId === "" || openId !== id ? openMenu(id) : closeMenu();
  }

  return (
    <TextEnd>
      <StyledToggle
        $btn={typeof Btn === "string" ? "true" : "false"}
        onClick={handleClick}
        ref={clickRef}
      >
        <>
          {Btn}
          {typeof Btn === "string" ? (
            id === "" || openId !== id ? (
              <MdKeyboardArrowLeft />
            ) : (
              <MdKeyboardArrowDown />
            )
          ) : null}
        </>
        {children}
      </StyledToggle>
    </TextEnd>
  );
}

function List({
  id,
  children,
  width,
}: {
  id: string;
  children: React.ReactNode;
  width?: "toggle" | "sort";
}) {
  const { openId, listRef } = useContext(MenusContext);

  if (openId !== id) return null;
  return (
    <StyledList width={width} ref={listRef}>
      {children}
    </StyledList>
  );
}

function Button({
  children,
  icon,
  onClick,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const { closeMenu } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    closeMenu();
  }

  return (
    <StyledButton onClick={handleClick}>
      {icon}
      <span>{children}</span>
    </StyledButton>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
