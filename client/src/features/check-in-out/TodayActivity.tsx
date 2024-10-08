import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { ApiGetResponse } from "../../utils/ApiResponses";
import { getStaysTodayActivity } from "../../services/apiBookings";
import Loader from "../../ui/Loader";
import TodayItem from "./TodayItem";
import { Booking } from "../../types/ResponseTypes";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function Today() {
  const { data: stays, isPending } = ApiGetResponse({
    queryKey: ["todaay-activity"],
    queryFn: getStaysTodayActivity,
  });

  return (
    <StyledToday>
      <Row type="row">
        <Heading as="h2">Today</Heading>
      </Row>

      {!isPending ? (
        stays?.length > 0 ? (
          <TodayList>
            {stays.map((stay: Booking, i: number) => (
              <TodayItem key={i} stay={stay} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No Activity Today...</NoActivity>
        )
      ) : (
        <Loader />
      )}
    </StyledToday>
  );
}

export default Today;
