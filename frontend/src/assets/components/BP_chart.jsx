import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export default function BP_chart({ chartData }) {
  // Register required chart.js components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const { low, date, high } = chartData;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: "Blood Pressure",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: false, // hide the first y-axis
      },
      y1: {
        type: "linear",
        display: true, // show the blood pressure axis
        position: "left",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const data = {
    labels: date,
    datasets: [
      {
        label: "Low",
        data: low,
        backgroundColor: "rgba(252, 99, 255, 0.7)", // purple
        yAxisID: "y1",
        barPercentage: 0.6, // narrower bars
        borderRadius: 10, // rounded corners
      },
      {
        label: "High",
        data: high,
        backgroundColor: "rgba(99, 99, 255, 0.7)", // blue
        yAxisID: "y1",
        barPercentage: 0.6,
        borderRadius: 10,
      },
    ],
  };

  return (
    <div className="h-80 w-full">
      <Bar options={options} data={data} />
    </div>
  );
}
