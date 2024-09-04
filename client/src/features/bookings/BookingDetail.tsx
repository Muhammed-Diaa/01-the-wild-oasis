import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { ApiGetResponse, IUDApiResponse } from "../../utils/ApiResponses";
import {
  deleteBooking,
  getBookingByID,
  updateBooking,
} from "../../services/apiBookings";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { Booking } from "../../types/ResponseTypes";
import Meta from "../../utils/Meta";
import Modal from "../../context/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import PageNotFound from "../../pages/PageNotFound";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const location = useLocation();
  const moveBack = useMoveBack();
  const { bookingId } = location.state ?? 22;
  const navigate = useNavigate();
  const { data, isPending } = ApiGetResponse({
    queryKey: ["booking", `${bookingId}`],
    queryFn: () => getBookingByID(Number(bookingId)),
  });
  const { mutate: Deleting, isPending: DeleteProssing } = IUDApiResponse({
    queryKey: "bookings",
    FN: deleteBooking,
    FunctionName: "Deleting",
    onSuccess: moveBack,
  });
  const { mutate } = IUDApiResponse({
    queryKey: ["booking", `${bookingId}`],
    FN: updateBooking,
    FunctionName: `Checking out ${bookingId}`,
  });
  const booking = data as Booking;
  const status = booking?.status as keyof typeof statusToTagName;

  if (isPending) return <Spinner />;
  if (!data) return <PageNotFound />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Meta title={`Details ${booking.cabins.name}`}>
      <Row type="row">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status] as "green"}>
            {status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="delete">
            <Button $variation="danger">Delete Booking</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              type={"booking"}
              id={bookingId}
              mutate={Deleting}
              isPending={DeleteProssing}
            />
          </Modal.Window>
        </Modal>

        {status === "unconfirmed" && (
          <Button
            onClick={() =>
              navigate(`/bookings/checkin/${booking.cabins.name}`, {
                state: { bookingId },
              })
            }
          >
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            onClick={() => {
              navigate("/dashboard");
              mutate({ id: bookingId, checked: { status: "checked-out" } });
            }}
          >
            Check out
          </Button>
        )}
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </Meta>
  );
}

export default BookingDetail;
