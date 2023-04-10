import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Point,
  registerables,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { ClimbingRoutes, ClimbingRoutesAttempts } from "@prisma/client";
import { groupAttemptsByTypeAndDate } from "@/utils/dataFormatters";
import "chartjs-adapter-date-fns";
import { ATTEMPT_TYPES } from "@/types/types";
import { useState } from "react";
import {
  getTommorow,
  getAWeekAgo,
  getAMonthAgo,
  getThreeMonthsAgo,
  getSixMonthsAgo,
  getAYearAgo,
} from "@/utils/dateUtils";

ChartJS.register(...registerables);

type UserAttemptsScatterChartProps = {
  attempts: ClimbingRoutesAttempts[];
};

export const UserAttemptsScatterChart = (
  props: UserAttemptsScatterChartProps
) => {
  const [fromDate, setFrom] = useState<Date | undefined>(getAWeekAgo());
  const [toDate, setTo] = useState<Date | undefined>(getTommorow()); // offset to account for the fact that the chart will not show the last day
  const [attemptsData, setAttemptsData] = useState<{
    working: Point[];
    crux: Point[];
    linking: Point[];
    redpoint: Point[];
  }>(groupAttemptsByTypeAndDate(props.attempts));

  const options: ChartOptions<"scatter"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bubble Chart",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          minUnit: "day",
        },
        min: fromDate ? fromDate.toISOString() : undefined,
        max: toDate ? toDate.toISOString() : undefined,
      },
      y: {
        min: 0,
        max:
          attemptsData.crux.length +
          attemptsData.linking.length +
          attemptsData.redpoint.length +
          attemptsData.working.length,
      },
    },
  };

  const data: ChartData<"scatter"> = {
    datasets: [
      {
        type: "scatter",
        data: attemptsData.working,
        label: ATTEMPT_TYPES.working,
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
      {
        type: "scatter",
        data: attemptsData.crux,
        label: ATTEMPT_TYPES.crux,
        backgroundColor: "rgba(54, 162, 235, 0.8)",
      },
      {
        type: "scatter",
        data: attemptsData.linking,
        label: ATTEMPT_TYPES.linking,
        backgroundColor: "rgba(255, 206, 86, 0.8)",
      },
      {
        type: "scatter",
        data: attemptsData.redpoint,
        label: ATTEMPT_TYPES.redpoint,
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
    ],
  };

  return (
    <>
      <div className="h-full w-full">
        <Scatter data={data} options={options} className="h-full w-full" />
        <div className="flex flex-row items-center justify-center pb-4">
          <select
            className="bg-slate-200 px-4 py-2 font-bold text-slate-800 hover:bg-slate-300"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "week") {
                setFrom(getAWeekAgo());
              } else if (value === "month") {
                setFrom(getAMonthAgo());
              } else if (value === "threeMonths") {
                setFrom(getThreeMonthsAgo());
              } else if (value === "sixMonths") {
                setFrom(getSixMonthsAgo());
              } else if (value === "year") {
                setFrom(getAYearAgo());
              } else {
                setFrom(undefined);
              }
            }}
          >
            <option value="week">1 Week</option>
            <option value="month">1 Month</option>
            <option value="threeMonths">3 Months</option>
            <option value="sixMonths">6 Months</option>
            <option value="year">1 Year</option>
            <option value="allTime">All Time</option>
          </select>
        </div>
      </div>
    </>
  );
};
