import supabase from "../../services/supabase";
import { TbMinus } from "react-icons/tb";
import { RxCopy } from "react-icons/rx";
import styled from "styled-components";

import Button from "../../ui/Button";
import Menu from "../../context/Menu";
import ConfirmDelete from "../../ui/ConfirmDelete";

import CreateAndEditCabin from "./CreateAndEditCabin";
import Table from "../../context/Table";

import { insertAndEditCabin } from "../../services/apiCabins";
import { IUDApiResponse } from "../../utils/ApiResponses";
import { CabinResponse } from "../../types/ResponseTypes";
import { formatCurrency } from "../../utils/helpers";
import { BsThreeDotsVertical } from "react-icons/bs";

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
const TbSMinus = styled(TbMinus)`
  font-size: large;
  font-weight: bold;
`;
const DotsVertical = styled(BsThreeDotsVertical)`
  font-size: 20px;
`;

const CabinRow = ({ Data }: { Data: CabinResponse }) => {
  const { id, ...rest }: CabinResponse = Data;
  const { mutate } = IUDApiResponse({
    queryKey: "cabins",
    FN: insertAndEditCabin,
    FunctionName: "Duplicating",
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
      <Menu>
        <Menu.Btn>
          <DotsVertical />
        </Menu.Btn>
        <Menu.List close={false}>
          <Button
            $variation="toggle"
            onClick={onDuplicate}
            children={
              <>
                <span>Duplicate</span>
                <RxCopy />
              </>
            }
          />
          <CreateAndEditCabin editCabins={Data} />
          <ConfirmDelete id={id ?? 0} />{" "}
        </Menu.List>
      </Menu>
    </Table.Row>
  );
};

export default CabinRow;

//
