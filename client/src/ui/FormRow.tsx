import styled from "styled-components";

export const StyledRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  width: 100%;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
const Label = styled.label`
  font-weight: 500;
`;
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
interface Props {
  children: React.ReactNode;
  error?: string;
  name: string;
}
const FormRowComponent = ({ name, children, error }: Props) => {
  return (
    <StyledRow>
      <Label
        htmlFor={
          children && typeof children === "object" && "props" in children
            ? children.props?.id
            : undefined
        }
      >
        {name}
      </Label>
      {children}
      {error && <Error>{error}</Error>}
    </StyledRow>
  );
};
export default FormRowComponent;
