import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiGetResponse, IUDApiResponse } from "../../utils/ApiResponses";
import { getBookingByID, updateBooking } from "../../services/apiBookings";
import Checkbox from "../../ui/Checkbox";
import { Booking } from "../../types/ResponseTypes";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Meta from "../../utils/Meta";
import { formatCurrency } from "../../utils/helpers";
import { getSettings } from "../../services/apiSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const moveBack = useMoveBack();

  const [addBreakfast, setaddBreakfast] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(false);

  const { bookingId } = location.state || {};
  const { mutate, isPending } = IUDApiResponse({
    queryKey: ["booking", `${bookingId}`],
    FN: updateBooking,
    FunctionName: `Checking in ${bookingId}`,
    onSuccess: () => {
      navigate("/dashboard");
    },
  });
  const { data: setting } = ApiGetResponse({
    queryKey: "settings",
    queryFn: getSettings,
  });
  const { data } = ApiGetResponse({
    queryKey: ["booking", `${bookingId}`],
    queryFn: () => getBookingByID(Number(bookingId)),
  });

  const booking = data as Booking;

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  if (!booking) return <Spinner />;
  const { guests, totalPrice, numGuests, hasBreakfast, numNights, cabins } =
    booking;

  const optinalBeakfastPrice = numGuests * numNights * setting?.breakfastPrice;

  const handleCheckin = () => {
    mutate({
      id: bookingId,
      checked: addBreakfast
        ? {
            isPaid: true,
            hasBreakfast: true,
            status: "checked-in",
            extrasPrice: optinalBeakfastPrice,
            totalPrice: totalPrice + optinalBeakfastPrice,
          }
        : { isPaid: true, status: "checked-in" },
    });
  };

  return (
    <Meta title={`Check in ${cabins.name}`}>
      <Row type="row">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setaddBreakfast((prev) => !prev);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optinalBeakfastPrice)}?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          disabled={isPending || confirmPaid}
          id="confirm"
          checked={confirmPaid}
          onChange={() => setConfirmPaid((prev) => !prev)}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {formatCurrency(
            addBreakfast ? optinalBeakfastPrice + totalPrice : totalPrice
          )}{" "}
          {addBreakfast &&
            `(${formatCurrency(totalPrice)} + ${formatCurrency(
              optinalBeakfastPrice
            )})`}
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
