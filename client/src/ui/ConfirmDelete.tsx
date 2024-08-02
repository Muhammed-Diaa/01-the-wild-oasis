import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import { ConfirmDeleteProps } from "../types/ResponseTypes";
import InsertDataLayout from "./InsertData";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
}: ConfirmDeleteProps) {
  return (
    <InsertDataLayout>
      <StyledConfirmDelete>
        <Heading as="h3">Delete {resourceName}</Heading>
        <p>
          Are you sure you want to delete this {resourceName} permanently? This
          action cannot be undone.
        </p>

        <div>
          <Button
            $variation="secondary"
            value={0}
            onClick={(e) => onConfirm(e)}
            disabled={disabled}
          >
            Cancel
          </Button>
          <Button
            $variation="danger"
            value={1}
            onClick={(e) => onConfirm(e)}
            disabled={disabled}
          >
            Delete
          </Button>
        </div>
      </StyledConfirmDelete>
    </InsertDataLayout>
  );
}

export default ConfirmDelete;
