// import styled from "styled-components";

import Heading from "./Heading";
// import { ConfirmDeleteProps } from "../types/ResponseTypes";
// import TapLayoutOverAll from "./TapLayoutOverAll"

import styled from "styled-components";
import { IUDApiResponse } from "../utils/ApiResponses";
import { deleteCabin } from "../services/apiCabins";
import Meta from "../utils/Meta";
import { StyledRow } from "./FormRow";
import Button from "./Button";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: start;
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
  id,
  onCloseModal,
}: {
  id: number;
  onCloseModal?: () => void;
}) {
  const { mutate, isPending } = IUDApiResponse({
    queryKey: "cabins",
    FN: deleteCabin,
    FunctionName: "Deleting",
  });
  const onDelete = () => {
    mutate(id);
  };
  // const state = status === "success";
  return (
    <Meta title="Delete Cabin">
      <StyledConfirmDelete>
        <Heading as="h3">Delete {"we"}</Heading>
        <p>
          Are you sure you want to delete this {"we"} permanently? This action
          cannot be undone.
        </p>
      </StyledConfirmDelete>
      <StyledRow>
        <Button onClick={() => onCloseModal?.()} $variation="secondary">
          Cancel
        </Button>
        <Button $variation={"danger"} onClick={onDelete} disabled={isPending}>
          Delete
        </Button>
      </StyledRow>
    </Meta>
  );
}

export default ConfirmDelete;

{
  /* 
  <TapLayoutOverAll
    status={status}
      buttonName={"Delete"}
      confirmButton={"Delete"}
      isPending={isPending}
       onDelete={onConfirm}
     >
       <StyledConfirmDelete>
         <Heading as="h3">Delete {resourceName}</Heading>
         <p>
           Are you sure you want to delete this {resourceName} permanently? This
           action cannot be undone.
         </p>
       </StyledConfirmDelete>
    </TapLayoutOverAll> */
}
