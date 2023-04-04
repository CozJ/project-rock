import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  registerables,
} from "chart.js";
import { Bubble, Line } from "react-chartjs-2";
import { ClimbingRoutesAttempts } from "@prisma/client";
import { groupAttemptsByTypeAndDate } from "@/utils/dataFormatters";
import "chartjs-adapter-date-fns";
import { ATTEMPT_TYPES } from "@/types/types";

ChartJS.register(...registerables);

type AttemptsDateTypeBubbleChartProps = {
  attempts: ClimbingRoutesAttempts[];
};

export const AttemptsDateTypeBubbleChart = (
  props: AttemptsDateTypeBubbleChartProps
) => {
  const [working, linking, crux, redpoint] = groupAttemptsByTypeAndDate(
    props.attempts
  );

  const options: ChartOptions<"bubble"> = {
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
          unit: "day",
        },
      },
    },
  };

  const data: ChartData<
    "bubble",
    { key: Date; value: number; radius: number }[]
  > = {
    datasets: [
      {
        type: "bubble",
        data: working,
        label: ATTEMPT_TYPES.working,
        backgroundColor: "rgba(255, 99, 132, 0.8)",
        parsing: {
          xAxisKey: "key",
          yAxisKey: "value",
          radiusKey: "radius",
        },
      },
      {
        data: crux,
        label: ATTEMPT_TYPES.crux,
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        parsing: {
            xAxisKey: "key",
            yAxisKey: "value",
            radiusKey: "radius",
          },
      },
      {
        data: linking,
        label: ATTEMPT_TYPES.linking,
        backgroundColor: "rgba(255, 206, 86, 0.8)",
        parsing: {
            xAxisKey: "key",
            yAxisKey: "value",
            radiusKey: "radius",
          },
      },

      {
        data: redpoint,
        label: ATTEMPT_TYPES.redpoint,
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        parsing: {
            xAxisKey: "key",
            yAxisKey: "value",
            radiusKey: "radius",
          },
      },
    ],
  };

  return <Bubble data={data} options={options} className="h-full w-full" />;
};
