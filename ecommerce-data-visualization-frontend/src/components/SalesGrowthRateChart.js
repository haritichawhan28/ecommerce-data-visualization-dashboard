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

const SalesGrowthRateChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/sales-growth-rate")
      .then(async (response) => {
        // Check if response is not JSON and contains HTML content
        const contentType = response.headers.get("Content-Type");
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status} - ${errorMessage}`
          );
        }
        if (contentType && contentType.includes("text/html")) {
          throw new Error(
            "Received HTML instead of JSON. Check the API endpoint."
          );
        }
        return response.json();
      })
      .then((data) => {
        // Process data to format for Chart.js
        const labels = data.map((item) => item._id); // Adjust based on your data structure
        const growthRates = data.map((item) => item.growthRate);

        setData({
          labels,
          datasets: [
            {
              label: "Sales Growth Rate Over Time",
              data: growthRates,
              borderColor: "rgba(153, 102, 255, 1)",
              backgroundColor: "rgba(153, 102, 255, 0.2)",
            },
          ],
        });
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message); // Set the error message to display
      });
  }, []);

  return (
    <div className="chart-container">
      <h2>Sales Growth Rate Over Time</h2>
      {error ? (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      ) : (
        <Line data={data} />
      )}
    </div>
  );
};

export default SalesGrowthRateChart;
