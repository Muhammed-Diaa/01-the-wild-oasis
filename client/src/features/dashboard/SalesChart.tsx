import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import { Booking } from "../../types/ResponseTypes";
import {
  ResponsiveContainer,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
} from "recharts";
import Heading from "../../ui/Heading";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const isDarkMode = true;
const colors = isDarkMode
  ? {
      totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
      extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
      text: "#e5e7eb",
      background: "#18212f",
    }
  : {
      totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
      extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
      text: "#374151",
      background: "#fff",
    };

const SalesChart = ({
  data = [],
  status = 7,
}: {
  data?: Booking[];
  status?: number;
}) => {
  const allDate = eachDayOfInterval({
    start: subDays(new Date(), status - 1),
    end: new Date(),
  });

  const Data = allDate.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: data
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: data
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDate[0], "MMM dd yyyy")} —{" "}
        {format(allDate[allDate.length - 1], "MMM dd yyyy")}{" "}
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={Data}>
          <XAxis dataKey={"label"} />
          <YAxis unit={"$"} />
          <CartesianGrid strokeDasharray="4" stroke={colors.background} />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
              color: colors.text,
            }}
          />
          <Area
            dataKey={"totalSales"}
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
            dot={{ r: 1, fill: "white" }}
            yAxisId={0}
            xAxisId={0}
            activeDot={{ r: 8, fill: colors.totalSales.stroke }}
          />
          <Area
            dataKey={"extrasSales"}
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extra sales"
            unit="$"
            dot={{ r: 1, fill: "white" }}
            yAxisId={0}
            xAxisId={0}
            activeDot={{ r: 8, fill: colors.extrasSales.stroke }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
};
export default SalesChart;
