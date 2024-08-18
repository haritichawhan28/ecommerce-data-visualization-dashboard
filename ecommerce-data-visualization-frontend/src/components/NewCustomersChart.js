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

const NewCustomersChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetch("http://localhost:5000/api/new-customers-over-time")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Process data to format for Chart.js
        const labels = data.map((item) => item._id); // Adjust based on your data structure
        const newCustomers = data.map((item) => item.newCustomers);

        setData({
          labels,
          datasets: [
            {
              label: "New Customers Added Over Time",
              data: newCustomers,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
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
      <h2>New Customers Added Over Time</h2>
      <Bar data={data} />
    </div>
  );
};

export default NewCustomersChart;
