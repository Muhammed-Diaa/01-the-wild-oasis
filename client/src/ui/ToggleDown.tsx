import React, { Children, useEffect, useRef, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import styled from "styled-components";

const Options = styled.div`
  text-align: end;
  position: relative;
`;
const Button = styled.button`
  border: none;
  background: inherit;

  &:focus {
    outline: none;
  }
`;
const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: var(--color-grey-700);
  border-radius: 40px;
  width: 100px;
  height: auto;
  right: 13px;
  top: 26px;

  > *:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-400);
  }
  > *:last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  > *:first-child {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
`;
const OptionDots = styled(HiOutlineDotsVertical)`
  font-size: 20px;
`;

interface Children {
  children: React.ReactNode;
  dubRef: React.RefObject<HTMLButtonElement>;
}
const Toggle = ({ children, dubRef }: Children) => {
  const toggleRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if dubRef is open, if so close it after 60 seconds
      if (dubRef.current) {
        setTimeout(() => {
          setOpenToggle(false);
        }, 100);
      }

      // If toggleRef is open and click is outside of toggleRef, close it immediately
      else if (
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setOpenToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [openToggle, setOpenToggle] = useState(false);
  return (
    <Options>
      <Button>
        <OptionDots onClick={() => setOpenToggle((i) => !i)} />
      </Button>
      {openToggle && <Menu ref={toggleRef}>{children}</Menu>}
    </Options>
  );
};
export default Toggle;
