import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const TotalSalesChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetch("http://localhost:5000/api/sales-over-time")
      .then((response) => {
        console.log(response); // Log the full response
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then((text) => {
            throw new Error(`HTTP error! status: ${response.status} - ${text}`);
          });
        }
      })
      .then((data) => {
        const labels = data.map((item) => item._id);
        const sales = data.map((item) => item.totalSales);

        setData({
          labels,
          datasets: [
            {
              label: "Total Sales Over Time",
              data: sales,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
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
      <h2>Total Sales Over Time</h2>
      <Line data={data} />
    </div>
  );
};

export default TotalSalesChart;
