import styled from "styled-components";
import { CabinResponse, Cabins } from "../../types/ResponseTypes";
import Toggle from "../../ui/ToggleDown";
import { TiEdit } from "react-icons/ti";
import { GoTrash } from "react-icons/go";

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
  margin-left: 10px;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
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
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: var(--color-grey-200);
  }
`;
const CabinRow = ({ Data }: Cabins) => {
  const { image, name, maxCapcity, regularPrine, discount }: CabinResponse =
    Data;
  return (
    <TableRow>
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <Cabin>{maxCapcity}</Cabin>
      <Price>{regularPrine}</Price>
      <Discount>{discount}</Discount>
      <Toggle>
        <Button>
          <span>edit</span> <TiEdit />
        </Button>
        <Button>
          <span>remove</span> <GoTrash />
        </Button>
      </Toggle>
    </TableRow>
  );
};
export default CabinRow;
