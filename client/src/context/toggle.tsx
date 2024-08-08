import {
  createContext,
  FormEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { StyledRow } from "../ui/FormRow";
import Button from "../ui/Button";
import styled from "styled-components";
import { Form } from "react-router-dom";
import useOutsideClick from "../hooks/useOutsideClick";

interface ToggleBTN {
  $variation?: "primary" | "secondary" | "danger" | "toggle";
  onClick?: () => void;
  isPending?: boolean;
  children?: React.ReactNode;
  status?: unknown;
}

const ToggleContext = createContext<{
  OpenModel: boolean;
  openRef: React.RefObject<HTMLButtonElement>;
  close: () => void;
  toggle: () => void;
}>({
  OpenModel: false,
  openRef: { current: null },
  close: () => {},
  toggle: () => {},
});

function useToggle() {
  return useContext(ToggleContext);
}
const FormData = styled(Form)`
  background-color: var(--color-grey-0);
  max-width: 120rem;
  padding: 4rem;
  border-radius: var(--border-radius-sm);
`;
const Layout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`;

const Toggles = ({ children }: { children: React.ReactNode }) => {
  const [OpenModel, setIsOpenModel] = useState(false);
  const openRef = useRef<HTMLButtonElement>(null);
  const close = () => setIsOpenModel(false);
  const toggle = () => setIsOpenModel(true);

  return (
    <ToggleContext.Provider value={{ OpenModel, openRef, close, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
};

const Btn = ({ $variation, isPending, children }: ToggleBTN) => {
  const { toggle } = useToggle();
  return (
    <Button $variation={$variation} onClick={toggle} disabled={isPending}>
      {children}
    </Button>
  );
};
const MenuT = ({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  status?: unknown;
}) => {
  const { OpenModel, close } = useToggle();
  const openRef = useRef(null);
  useOutsideClick(openRef, close);
  return (
    OpenModel && (
      <Layout>
        <FormData onSubmit={onSubmit} ref={openRef}>
          {children}
        </FormData>
      </Layout>
    )
  );
};
const Buttons = ({
  children,
  $variation,
  onClick,
  isPending,
  status,
}: ToggleBTN) => {
  const { close } = useToggle();
  useEffect(() => {
    if (status) {
      close();
    }
  }, [status, close]);
  return (
    <StyledRow>
      <Button
        onClick={() => {
          close();
        }}
        $variation="secondary"
      >
        Cancel
      </Button>
      <Button
        $variation={$variation || "primary"}
        onClick={() => {
          status && close();
          onClick?.();
        }}
        disabled={isPending}
      >
        {children}
      </Button>
    </StyledRow>
  );
};

Toggles.Btn = Btn;
Toggles.Menu = MenuT;
Toggles.Buttons = Buttons;

export default Toggles;
