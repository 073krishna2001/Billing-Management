import React from "react";
import { Line } from "react-chartjs-2";
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

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TimeSeriesChart = ({ bills, selectedMonth }) => {
  const selectedDate = new Date(selectedMonth);

  const filteredBills = bills.filter((bill) => {
    const billDate = new Date(bill.date);
    return (
      billDate.getFullYear() === selectedDate.getFullYear() &&
      billDate.getMonth() === selectedDate.getMonth()
    );
  });

  const groupedByDay = filteredBills.reduce((acc, bill) => {
    const day = new Date(bill.date).getDate();
    acc[day] = (acc[day] || 0) + parseFloat(bill.amount);
    return acc;
  }, {});

  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const data = labels.map((day) => groupedByDay[day] || 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: `Expenses for ${selectedDate.toLocaleString("default", { month: "long" })}`,
        data,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom height
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: `Monthly Expenses (${selectedDate.toLocaleString("default", { month: "long" })})`,
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Days of the Month",
          font: {
            size: 14,
          },
        },
        ticks: {
          maxTicksLimit: 10, // Reduce number of labels on the X-axis for better readability
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount (₹)",
          font: {
            size: 14,
          },
        },
        beginAtZero: true,
        ticks: {
          stepSize: 500, // Adjust step size for better readability
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <style>
        {`
          .chart-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            height: 400px; /* Set a default height */
          }

          @media (max-width: 768px) {
            .chart-container {
              padding: 10px;
              max-width: 100%;
              height: 500px; /* Increase height for mobile screens */
            }

            canvas {
              max-width: 100%;
              height: 500px !important; /* Ensure chart expands properly */
            }
          }
        `}
      </style>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TimeSeriesChart;
