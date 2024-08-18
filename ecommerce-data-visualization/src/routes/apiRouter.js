import express from "express";
import {
  getTotalSalesOverTime,
  getSalesGrowthRate,
  getNewCustomersOverTime,
  getGeographicalDistribution,
  getRepeatCustomers,
  getCustomerLifetimeValueByCohorts,
} from "../controllers/index.js";

const router = express.Router();

// Total Sales Over Time
router.get("/sales-over-time", getTotalSalesOverTime);

// Sales Growth Rate Over Time
router.get("/sales-growth-rate", getSalesGrowthRate);

// New Customers Added Over Time
router.get("/new-customers-over-time", getNewCustomersOverTime);

// Number of Repeat Customers
router.get("/repeat-customers", getRepeatCustomers);

// Geographical Distribution of Customers
router.get("/geographical-distribution", getGeographicalDistribution);

// Customer Lifetime Value by Cohorts
router.get("/customer-lifetime-value", getCustomerLifetimeValueByCohorts);

export default router;
