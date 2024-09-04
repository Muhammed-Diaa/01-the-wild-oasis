import supabase from "../../services/supabase";
import { TbMinus } from "react-icons/tb";
import { RxCopy } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import styled from "styled-components";

import Table from "../../context/Table";
import Modal from "../../context/Modal";
import Menus from "../../context/Menu";

import CreateAndEditCabin from "./CreateAndEditCabin";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { deleteCabin, insertAndEditCabin } from "../../services/apiCabins";
import { IUDApiResponse } from "../../utils/ApiResponses";
import { CabinResponse } from "../../types/ResponseTypes";
import { formatCurrency } from "../../utils/helpers";
import { IoTrashBinOutline } from "react-icons/io5";
import { HiEllipsisVertical } from "react-icons/hi2";

const Img = styled.img`
  display: block;
  width: 7.2rem;
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

  color: #ff000061;
  text-decoration: line-through;
`;
const TPrice = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;
const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
const TbSMinus = styled(TbMinus)`
  font-size: large;
  font-weight: bold;
`;

const CabinRow = ({ Data }: { Data: CabinResponse }) => {
  const { id, ...rest }: CabinResponse = Data;
  const { mutate } = IUDApiResponse({
    queryKey: "cabins",
    FN: insertAndEditCabin,
    FunctionName: "Duplicating",
  });
  const { mutate: Deleting, isPending } = IUDApiResponse({
    queryKey: "cabins",
    FN: deleteCabin,
    FunctionName: "Deleting",
  });
  const onDuplicate = async () => {
    const { data: existingCabins } = await supabase
      .from("cabins")
      .select("name");

    if (!existingCabins) {
      console.error("Failed to fetch existing cabin names");
      return;
    }
    const baseName = Data.name;
    let uniqueName = baseName;
    let copyNumber = 1;
    while (existingCabins.some((cabin) => cabin.name === uniqueName)) {
      uniqueName = `${baseName} (copy ${copyNumber})`;
      copyNumber += 1;
    }
    mutate({
      Data: { ...rest, name: uniqueName },
    });
  };

  return (
    <Table.Row>
      <Img src={Data.image as string} alt={Data.name} />
      <Cabin>{Data.name}</Cabin>
      <div>Fits up to {Data.maxCapacity} guests</div>
      <Price>{formatCurrency(Data.regularPrice)}</Price>
      <Discount>
        {Data.discount ? formatCurrency(Data.discount) : <TbSMinus />}
      </Discount>
      <TPrice>{formatCurrency(Data.regularPrice - Data.discount)}</TPrice>

      <Modal>
        <Menus>
          <Menus.Toggle Btn={<HiEllipsisVertical />} id={`${Data.id}`}>
            <Menus.List id={`${Data.id}`}>
              <Menus.Button onClick={onDuplicate} icon={<RxCopy />}>
                Duplicate
              </Menus.Button>
              <Modal.Open opens={"edit"}>
                <Menus.Button icon={<FiEdit />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open opens={"delete"}>
                <Menus.Button icon={<IoTrashBinOutline />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Toggle>
          <Modal.Window name="edit">
            <CreateAndEditCabin editCabins={Data} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              type="Cabin"
              mutate={Deleting}
              isPending={isPending}
              id={Data.id ?? 0}
            />
          </Modal.Window>
        </Menus>
      </Modal>
    </Table.Row>
  );
};

export default CabinRow;
