import styled from "styled-components";
import { CabinResponse } from "../../types/ResponseTypes";
import Toggle from "../../ui/ToggleDown";
import { TiEdit } from "react-icons/ti";
import { GoTrash } from "react-icons/go";
import { formatCurrency } from "../../utils/helpers";
import { deleteCabin } from "../../services/apiCabins";
import { IUDApiResponse } from "../../utils/ApiResponse";
import { useState } from "react";
import CreateAndEditCabin from "./CreateAndEditCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;
const Img = styled.img`
  display: block;
  width: 8rem;
  aspect-ratio: 3 / 2;
  object-fit: fill;
  object-position: center;
  transform: scale(1.5) translateX(-2px);
`;
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;
const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;
const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  font-weight: 600;
  padding: 10px 16px;
  z-index: 10;

  &:focus {
    outline: none;
  }
  &:hover {
    background-color: var(--color-grey-200);
  }
`;

const CabinRow = ({ Data }: { Data: CabinResponse }) => {
  const [open, setOpen] = useState(false);
  const {
    id,
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
  }: CabinResponse = Data;
  const { mutate: Deleting } = IUDApiResponse({
    queryKey: "cabins",
    FN: deleteCabin,
    loading: "Deleting cabin...",
    success: "Cabin deleted successfully!",
    error: "Can't delete cabin!",
  });
  return (
    <TableRow>
      <Img src={typeof image === "string" ? image : ""} alt={name} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <Toggle>
        <Button onClick={() => setOpen(true)}>
          <span>edit</span> <TiEdit />
        </Button>
        <Button onClick={id ? () => Deleting(id) : () => {}}>
          <span>remove</span> <GoTrash />
        </Button>
      </Toggle>
      {open && (
        <CreateAndEditCabin
          editCabins={Data}
          setOpen={(value) => {
            setOpen(value);
          }}
        />
      )}
    </TableRow>
  );
};
export default CabinRow;
