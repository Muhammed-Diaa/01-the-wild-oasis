import Toggle from "../../ui/ToggleDown";
import styled from "styled-components";
import { useRef, useState } from "react";
import { GoTrash } from "react-icons/go";
import { TbMinus } from "react-icons/tb";
import { TiEdit } from "react-icons/ti";

import { CabinResponse } from "../../types/ResponseTypes";
import { deleteCabin, insertAndEditCabin } from "../../services/apiCabins";
import CreateAndEditCabin from "./CreateAndEditCabin";
import { IUDApiResponse } from "../../utils/ApiResponses";
import { formatCurrency } from "../../utils/helpers";
import Meta from "../../utils/Meta";
import ConfirmDelete from "../../ui/ConfirmDelete";
import supabase from "../../services/supabase";

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

const TbSMinus = styled(TbMinus)`
  font-size: large;
  font-weight: bold;
`;

const CabinRow = ({ Data }: { Data: CabinResponse }) => {
  const [openEditing, setOpenEditing] = useState(false);
  const [confirmDeleting, setConfirmDeleting] = useState(false);
  const { id, ...rest }: CabinResponse = Data;

  const { mutate: Deleting } = IUDApiResponse({
    queryKey: "cabins",
    FN: deleteCabin,
    FunctionName: "Deleting",
    setOpen: setConfirmDeleting,
    onError: setConfirmDeleting,
  });

  const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).value === "1"
      ? Deleting(id ?? 0)
      : setConfirmDeleting(false);
  };
  const { mutate: Duplicating } = IUDApiResponse({
    queryKey: "cabins",
    FN: insertAndEditCabin,
    FunctionName: "Duplicating",
  });
  const onDuplicate = async () => {
    // Fetch existing cabin names from the database
    const { data: existingCabins } = await supabase
      .from("cabins")
      .select("name");
    if (!existingCabins) {
      console.error("Failed to fetch existing cabin names");
      return;
    }

    // Initialize variables for the unique name generation
    const baseName = Data.name;
    let uniqueName = baseName;
    let copyNumber = 1;

    // Check if the name already exists and generate a unique name
    while (existingCabins.some((cabin) => cabin.name === uniqueName)) {
      uniqueName = `${baseName} (copy ${copyNumber})`;
      copyNumber += 1;
    }

    // Call the duplicating function with the new unique name

    Duplicating({
      Data: { ...rest, name: uniqueName },
    });
  };
  const dubref = useRef<HTMLButtonElement>(null);
  return (
    <>
      <TableRow>
        <Img src={Data.image as string} alt={Data.name} />
        <Cabin>{Data.name}</Cabin>
        <div>Fits up to {Data.maxCapacity} guests</div>
        <Price>{formatCurrency(Data.regularPrice)}</Price>
        <Discount>
          {Data.discount ? formatCurrency(Data.discount) : <TbSMinus />}
        </Discount>
        <Toggle dubRef={dubref}>
          <Button
            ref={dubref}
            onClick={() => {
              onDuplicate();
            }}
          >
            <span>Duplicate</span>
          </Button>
          <Button onClick={() => setOpenEditing(true)}>
            <span>Edit</span> <TiEdit />
          </Button>
          <Button onClick={() => setConfirmDeleting(true)}>
            <span>Remove</span> <GoTrash />
          </Button>
        </Toggle>
      </TableRow>
      {confirmDeleting && (
        <Meta title={"Delete Cabin"}>
          <ConfirmDelete
            setOpen={setConfirmDeleting}
            resourceName={Data.name}
            onConfirm={(e) => onConfirm(e)}
            disabled={false}
          />
        </Meta>
      )}
      {openEditing && (
        <Meta title={"Edit Cabin"}>
          <CreateAndEditCabin editCabins={Data} setOpen={setOpenEditing} />
        </Meta>
      )}
    </>
  );
};

export default CabinRow;
