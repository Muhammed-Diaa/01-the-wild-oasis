import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import { Booking } from "../../types/ResponseTypes";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { IUDApiResponse } from "../../utils/ApiResponses";
import { updateBooking } from "../../services/apiBookings";
import { useQueryClient } from "@tanstack/react-query";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;
interface TodayItemProps {
  stay: Booking;
}

const TodayItem = ({ stay }: TodayItemProps) => {
  const { id: bookingId, guests, status, numNights, cabins } = stay;

  const { mutate } = IUDApiResponse({
    queryKey: ["booking", `${bookingId}`],
    FN: updateBooking,
    FunctionName: `Checking out ${bookingId}`,
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>
      {status === "unconfirmed" && (
        <Button
          $size="small"
          onClick={() =>
            navigate(`/bookings/checkin/${cabins.name}`, {
              state: { bookingId },
            })
          }
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && (
        <Button
          $size="small"
          onClick={() => {
            mutate(
              { id: bookingId, checked: { status: "checked-out" } },
              {
                onSuccess: () =>
                  queryClient.invalidateQueries({
                    queryKey: ["todaay-activity"],
                  }),
              }
            );
          }}
        >
          Check out
        </Button>
      )}
    </StyledTodayItem>
  );
};
export default TodayItem;
