import { Chart as ChartJS, ChartData, Point, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { ATTEMPT_TYPES, STATUS } from "@/types/types";
import { ClimbingRoutes } from "@prisma/client";
import { statusCountByCategory } from "@/utils/dataFormatters";
import { useState } from "react";

ChartJS.register(...registerables);

type UserStatusDistributionBarChartProps = {
  routes: ClimbingRoutes[];
};

export const UserStatusDistributionBarChart = (
  props: UserStatusDistributionBarChartProps
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
        text: "Route Status Distribution",
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

  const data: ChartData<"bar"> = {
    labels: Object.values(STATUS),
    datasets: [
      {
        data: statusCountByCategory(props.routes),
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
