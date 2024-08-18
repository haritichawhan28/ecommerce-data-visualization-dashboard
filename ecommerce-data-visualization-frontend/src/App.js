import React from "react";
import TotalSalesChart from "./components/TotalSalesChart";
import SalesGrowthRateChart from "./components/SalesGrowthRateChart";
import NewCustomersChart from "./components/NewCustomersChart";
import RepeatCustomersChart from "./components/RepeatCustomersChart";
import GeographicalDistributionChart from "./components/GeographicalDistributionChart";
import CustomerLifetimeValueChart from "./components/CustomerLifetimeValueChart";
import "./App.css";

function App() {
  return (
    <div className="App">
      <TotalSalesChart />
      <SalesGrowthRateChart />
      <NewCustomersChart />
      <RepeatCustomersChart />
      <GeographicalDistributionChart />
      <CustomerLifetimeValueChart />
    </div>
  );
}

export default App;
