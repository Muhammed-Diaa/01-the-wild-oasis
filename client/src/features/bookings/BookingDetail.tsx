import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { ApiGetResponse } from "../../utils/ApiResponses";
import { getBookingByID } from "../../services/apiBookings";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { Booking } from "../../types/ResponseTypes";
import Meta from "../../utils/Meta";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const location = useLocation();
  const { bookingId } = location.state || {};
  const navigate = useNavigate();
  const { data, isPending } = ApiGetResponse({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingByID(Number(bookingId)),
  });

  const booking = data as Booking;
  const status = booking?.status as keyof typeof statusToTagName;
  const moveBack = useMoveBack();
  if (!data || isPending) return <Spinner />;
  console.log("data", booking);

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
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </Meta>
  );
}

export default BookingDetail;
