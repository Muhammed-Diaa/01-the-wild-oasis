import { FormEventHandler, useEffect, useRef } from "react";
import { Form } from "react-router-dom";
import styled from "styled-components";

const FormData = styled(Form)`
  background-color: var(--color-grey-0);
  max-width: 120rem;
  padding: 4rem;
  border-radius: var(--border-radius-sm);
`;
const Layout = styled.div`
  position: absolute;
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
interface Props {
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}
function InsertDataLayout({ onSubmit, setOpen, children }: Props) {
  const openRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openRef.current && !openRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  return (
    <Layout>
      <FormData onSubmit={onSubmit} ref={openRef}>
        {children}
      </FormData>
    </Layout>
  );
}

export default InsertDataLayout;
