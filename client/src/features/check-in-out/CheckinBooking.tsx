import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useLocation } from "react-router-dom";
import { ApiGetResponse } from "../../utils/ApiResponses";
import { getBookingByID } from "../../services/apiBookings";
import Checkbox from "../../ui/Checkbox";
import { Booking } from "../../types/ResponseTypes";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Meta from "../../utils/Meta";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const location = useLocation();
  const moveBack = useMoveBack();

  const { bookingId } = location.state || {};

  const { data } = ApiGetResponse({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingByID(Number(bookingId)),
  });

  const booking = data as Booking;
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    setConfirm(booking?.isPaid ?? false);
  }, [booking]);

  if (!booking) return <Spinner />;
  const {
    guests,
    // totalPrice,
    // numGuests,
    // hasBreakfast,
    // numNights,
    isPaid,
    cabins,
  } = booking;

  function handleCheckin() {}

  return (
    <Meta title={`Check in ${cabins.name}`}>
      <Row type="row">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        <Checkbox
          disabled={isPaid}
          id={bookingId}
          checked={confirm}
          onChange={() => setConfirm((prev) => !prev)}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {formatCurrency(booking.totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirm}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </Meta>
  );
}

export default CheckinBooking;
