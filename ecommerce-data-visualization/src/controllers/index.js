import ShopifyOrder from "../models/ShopifyOrder.js";
import ShopifyCustomer from "../models/ShopifyCustomer.js";

// Total Sales Over Time
export const getTotalSalesOverTime = async (req, res) => {
  try {
    const totalSales = await ShopifyOrder.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$created_at" },
            month: { $month: "$created_at" },
          },
          totalSales: { $sum: "$total_price" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
      {
        $project: {
          _id: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              { $toString: "$_id.month" },
            ],
          },
          totalSales: "$totalSales",
        },
      },
    ]);
    console.log("Total Sales Data:", totalSales); // Log data to verify
    res.json(totalSales);
  } catch (error) {
    console.error("Error fetching total sales:", error); // Log errors
    if (error.name === "MongoError") {
      res.status(500).json({ error: "Database error occurred" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Sales Growth Rate Over Time
// Sales Growth Rate Over Time
export const getSalesGrowthRate = async (req, res) => {
  try {
    // Replace this with your actual aggregation pipeline or query
    const salesGrowthRate = await ShopifyOrder.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$created_at" },
            month: { $month: "$created_at" },
          },
          totalSales: { $sum: "$total_price" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
      {
        $project: {
          _id: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              { $toString: "$_id.month" },
            ],
          },
          growthRate: "$totalSales", // Calculate growth rate if needed
        },
      },
    ]);
    console.log("Sales Growth Rate Data:", salesGrowthRate); // Log data to verify
    res.json(salesGrowthRate);
  } catch (error) {
    console.error("Error fetching sales growth rate:", error); // Log errors
    if (error.name === "MongoError") {
      res.status(500).json({ error: "Database error occurred" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// New Customers Added Over Time
// New Customers Added Over Time
export const getNewCustomersOverTime = async (req, res) => {
  try {
    const newCustomers = await ShopifyCustomer.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$created_at" },
            month: { $month: "$created_at" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              { $toString: "$_id.month" },
            ],
          },
          newCustomers: "$count",
        },
      },
    ]);
    console.log("New Customers Data:", newCustomers); // Log data to verify
    res.json(newCustomers);
  } catch (error) {
    console.error("Error fetching new customers over time:", error); // Log errors
    if (error.name === "MongoError") {
      res.status(500).json({ error: "Database error occurred" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Geographical Distribution of Customers
export const getGeographicalDistribution = async (req, res) => {
  try {
    const geoDistribution = await ShopifyCustomer.aggregate([
      {
        $group: {
          _id: "$default_address.city",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);
    console.log("Geographical Distribution Data:", geoDistribution); // Log data to verify
    res.json(geoDistribution);
  } catch (error) {
    console.error("Error fetching geographical distribution:", error); // Log errors
    if (error.name === "MongoError") {
      res.status(500).json({ error: "Database error occurred" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Customer Lifetime Value by Cohorts
// Customer Lifetime Value by Cohorts
export const getCustomerLifetimeValueByCohorts = async (req, res) => {
  try {
    const lifetimeValue = await ShopifyOrder.aggregate([
      {
        $lookup: {
          from: "shopifyCustomers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $group: {
          _id: {
            year: { $year: "$customer.created_at" },
            month: { $month: "$customer.created_at" },
          },
          totalLifetimeValue: { $sum: { $toDouble: "$total_price_set" } },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);
    console.log("Customer Lifetime Value Data:", lifetimeValue); // Log data to verify
    res.json(lifetimeValue);
  } catch (error) {
    console.error("Error fetching customer lifetime value by cohorts:", error); // Log errors
    if (error.name === "MongoError") {
      res.status(500).json({ error: "Database error occurred" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const getRepeatCustomers = async (req, res) => {
  try {
    const repeatCustomers = await ShopifyCustomer.aggregate([
      {
        $group: {
          _id: "$default_address.city",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.json(repeatCustomers);
  } catch (error) {
    console.error("Error fetching repeat customers:", error);
    if (error.name === "MongoError") {
      res.status(500).json({ error: "Database error occurred" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
