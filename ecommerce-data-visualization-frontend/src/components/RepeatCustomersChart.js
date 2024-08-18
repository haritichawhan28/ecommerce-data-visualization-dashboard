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

const RepeatCustomersChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/repeat-customers")
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
        const repeatCustomers = data.map((item) => item.repeatCustomers);

        setData({
          labels,
          datasets: [
            {
              label: "Number of Repeat Customers",
              data: repeatCustomers,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
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
      <h2>Number of Repeat Customers</h2>
      {error ? (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      ) : (
        <Bar data={data} />
      )}
    </div>
  );
};

export default RepeatCustomersChart;
