import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Point,
  registerables,
} from "chart.js";
import { Scatter, Line } from "react-chartjs-2";
import { ClimbingRoutesAttempts } from "@prisma/client";
import { groupAttemptsByTypeAndDate } from "@/utils/dataFormatters";
import "chartjs-adapter-date-fns";
import { ATTEMPT_TYPES } from "@/types/types";
import { useState, useEffect } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

ChartJS.register(...registerables);

type AttemptsDateTypeScatterChartProps = {
  attempts: ClimbingRoutesAttempts[];
};

export const AttemptsDateTypeScatterChart = (
  props: AttemptsDateTypeScatterChartProps
) => {
  const [fromDate, setFrom] = useState<Date | undefined>(undefined);
  const [toDate, setTo] = useState<Date | undefined>(undefined);
  const [attemptsData, setAttemptsData] = useState<{
    working: Point[];
    crux: Point[];
    linking: Point[];
    redpoint: Point[];
  }>(groupAttemptsByTypeAndDate(props.attempts));

  // const updateAttemptsRange = () => {
  //   const filteredAttempts = props.attempts.filter((attempt) => {
  //     if (fromDate && toDate) {
  //       return (
  //         attempt.date.toISOString() >= fromDate.toISOString() &&
  //         attempt.date.toISOString() <= toDate.toISOString()
  //       );
  //     } else if (fromDate) {
  //       return attempt.date.toISOString() >= fromDate.toISOString();
  //     } else if (toDate) {
  //       return attempt.date.toISOString() <= toDate.toISOString();
  //     } else {
  //       return true;
  //     }
  //   });

  //   setAttemptsData(groupAttemptsByTypeAndDate(filteredAttempts));
  // };

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
          <input
            type="month"
            className="rounded-lg border p-1"
            onChange={(e) => {
              setFrom(new Date(e.target.value));
              //updateAttemptsRange();
            }}
          />
          <span className="flex items-center justify-center px-4">
            <ArrowForwardIcon />
          </span>
          <input
            type="month"
            className="rounded-lg border p-1"
            onChange={(e) => {
              setTo(new Date(e.target.value));
              //updateAttemptsRange();
            }}
          />
        </div>
      </div>
    </>
  );
};
