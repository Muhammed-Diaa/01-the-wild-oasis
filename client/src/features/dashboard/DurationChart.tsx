import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Booking } from "../../types/ResponseTypes";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#FF0000",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#FFA500",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#FFFF00",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#008000",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#0000FF",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#4B0082",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#EE82EE",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#800080",
  },
];

const PrepareData = (
  startData: { duration: string; value: number; color: string }[],
  stays: {
    numNights: number;
  }[]
) => {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  const incArrayValue = (
    arr: { duration: string; value: number }[],
    field: string
  ) => {
    return arr.map((obj: { duration: string; value: number }) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  };

  const data = stays
    ?.reduce(
      (
        arr: { duration: string; value: number }[],
        cur: { numNights: number }
      ) => {
        const num = cur.numNights;
        if (num === 1) return incArrayValue(arr, "1 night");
        if (num === 2) return incArrayValue(arr, "2 nights");
        if (num === 3) return incArrayValue(arr, "3 nights");
        if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
        if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
        if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
        if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
        if (num >= 21) return incArrayValue(arr, "21+ nights");
        return arr;
      },
      startData
    )
    .filter((obj: { value: number }) => obj.value > 0);

  return data;
};

const DurationChart = ({ confirmedStays }: { confirmedStays: Booking[] }) => {
  const startData = startDataLight;

  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={PrepareData(startData, confirmedStays)}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="50%"
            cy="50%"
            paddingAngle={3}
          >
            {startData.map((entry) => (
              <Cell key={entry.duration} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            widths="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
};

export default DurationChart;
