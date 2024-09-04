import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../context/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { Booking } from "../../types/ResponseTypes";
import { statusProps } from "../../types/ComponentsTypes";
import Menus from "../../context/Menu";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEllipsisVertical,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { IUDApiResponse } from "../../utils/ApiResponses";
import { deleteBooking, updateBooking } from "../../services/apiBookings";
import Modal from "../../context/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { deleteCabin } from "../../services/apiCabins";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({ booking }: { booking: Booking }) {
  const navigate = useNavigate();
  const {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName, email },
    cabins: { name: cabinName },
  } = booking;

  const { mutate: Deleting, isPending } = IUDApiResponse({
    queryKey: "bookings",
    FN: deleteBooking,
    FunctionName: "Deleting",
  });
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{fullName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          → {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} —{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag
        type={
          statusToTagName[
            status as keyof typeof statusToTagName
          ] as statusProps["type"]
        }
      >
        {status.replace("-", " ")}
      </Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus>
          <Menus.Toggle Btn={<HiEllipsisVertical />} id={bookingId.toString()}>
            <Menus.List id={bookingId.toString()}>
              <Menus.Button
                icon={<HiEye />}
                onClick={() =>
                  navigate(`/bookings/Details/${cabinName}`, {
                    state: { bookingId },
                  })
                }
              >
                See Details
              </Menus.Button>
              {status === "unconfirmed" && (
                <Menus.Button
                  icon={<HiArrowDownOnSquare />}
                  onClick={() =>
                    navigate(`/bookings/checkin/${cabinName}`, {
                      state: { bookingId },
                    })
                  }
                >
                  Check in
                </Menus.Button>
              )}
              {status === "checked-in" && (
                <Menus.Button
                  icon={<HiArrowUpOnSquare />}
                  onClick={() =>
                    navigate(`/bookings/Details/${cabinName}`, {
                      state: { bookingId },
                    })
                  }
                >
                  Check out
                </Menus.Button>
              )}
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Toggle>

          <Modal.Window name="delete">
            <ConfirmDelete
              type="Booking"
              mutate={Deleting}
              isPending={isPending}
              id={bookingId}
            />
          </Modal.Window>
        </Menus>
      </Modal>
    </Table.Row>
  );
}
export default BookingRow;
