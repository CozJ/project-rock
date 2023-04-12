import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { ATTEMPT_TYPES } from "@/types/types";
import { ClimbingRoutesAttempts } from "@prisma/client";
import { attemptsCountByCategory } from "@/utils/dataFormatters";

ChartJS.register(...registerables);

type AttemptsDistributionBarChartProps = {
  attempts: ClimbingRoutesAttempts[];
};

export const AttemptsDistributionBarChart = (
  props: AttemptsDistributionBarChartProps
) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Attempts Distribution",
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const data = {
    labels: Object.values(ATTEMPT_TYPES),
    datasets: [
      {
        data: attemptsCountByCategory(props.attempts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
        ],
      },
    ],
  };

  return <Bar data={data} options={options} className="h-full w-full" />;
};
