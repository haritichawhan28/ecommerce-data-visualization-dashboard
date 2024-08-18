import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CustomerLifetimeValueChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetch("http://localhost:5000/api/customer-lifetime-value")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Process data to format for Chart.js
        const labels = data.map((item) => item._id); // Adjust based on your data structure
        const lifetimeValues = data.map((item) => item.cohortLifetimeValue);

        setData({
          labels,
          datasets: [
            {
              label: "Customer Lifetime Value by Cohorts",
              data: lifetimeValues,
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgba(255, 206, 86, 1)",
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="chart-container">
      <h2>Customer Lifetime Value by Cohorts</h2>
      <Bar data={data} />
    </div>
  );
};

export default CustomerLifetimeValueChart;
