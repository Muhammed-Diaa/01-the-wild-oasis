import styled from "styled-components";
import { useRecentBookingData, useRecentStaysData } from "./useRecentData";

import Stats from "./stats";
import SalesChart from "./SalesChart";
import Loader from "../../ui/Loader";
import DurationChart from "./DurationChart";
import Today from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { Booking } = useRecentBookingData();
  const { stays, confirmedStays, status } = useRecentStaysData();

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={Booking}
        status={status}
        confirmedStays={confirmedStays}
      />
      <Today />
      <DurationChart confirmedStays={confirmedStays} />
      {!Booking ? <Loader /> : <SalesChart status={status} data={Booking} />}
    </StyledDashboardLayout>
  );
};
export default DashboardLayout;
