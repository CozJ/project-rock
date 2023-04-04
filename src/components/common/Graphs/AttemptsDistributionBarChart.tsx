import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { ATTEMPT_TYPES } from "@/types/types";
import { api } from "@/utils/api";

ChartJS.register(...registerables);

type AttemptsDistributionBarChartProps = {
  routeId: string;
};

export const AttemptsDistributionBarChart = (
  props: AttemptsDistributionBarChartProps
) => {
  const statistics = api.userStatistics.getRouteAttempts.useQuery({
    routeId: props.routeId,
  });

  if (statistics.isLoading) return <div>Loading...</div>;

  if (statistics.error) return <div>Error: {statistics.error.message}</div>;

  const sortData = () => {
    const data = {
      [ATTEMPT_TYPES.working]: 0,
      [ATTEMPT_TYPES.crux]: 0,
      [ATTEMPT_TYPES.linking]: 0,
      [ATTEMPT_TYPES.redpoint]: 0,
    };
    statistics.data.forEach((attempt) => {
      if (attempt.type in data) {
        data[attempt.type as keyof typeof data] = attempt._count;
      }
    });
    return Object.values(data);
  };

  console.log(statistics.data);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
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
    labels: [
      ATTEMPT_TYPES.working,
      ATTEMPT_TYPES.crux,
      ATTEMPT_TYPES.linking,
      ATTEMPT_TYPES.redpoint,
    ],
    datasets: [
      {
        data: sortData(),
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
