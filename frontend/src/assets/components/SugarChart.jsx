import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

export default function SugarChart({ chartData }) {
  const { before, after, date } = chartData; // ⬅️ kept consistent order

  // Register Chart.js components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Glucose Levels (Breakfast)",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        grid: {
          display: true,
        },
        ticks: {
          stepSize: 20, // optional: glucose scale readability
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4, // controls curve smoothness
      },
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    },
  };

  // Chart data
  const data = {
    labels: date.map((d) => d.slice(0, 10)), // ⬅️ just yyyy-mm-dd
    datasets: [
      {
        label: "Before Meal",
        data: before,
        borderColor: "rgba(0, 205, 145, 0.8)",
        backgroundColor: "rgba(0, 205, 145, 0.2)",
        yAxisID: "y",
        fill: true,
      },
      {
        label: "After Meal",
        data: after,
        borderColor: "rgba(84, 18, 255, 0.8)",
        backgroundColor: "rgba(84, 18, 255, 0.2)",
        yAxisID: "y",
        fill: true,
      },
    ],
  };

  return (
    <div className="w-full h-96 p-4 bg-white rounded-xl shadow-lg">
      <Line options={options} data={data} />
    </div>
  );
}
