import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  address1: { type: String },
  address2: { type: String },
  city: { type: String },
  province: { type: String },
  country: { type: String },
  zip: { type: String },
});

const shopifyCustomerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  created_at: { type: Date, required: true },
  default_address: addressSchema, // Refactored to use a schema for better structure
  email: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  last_order_id: { type: String }, // String is fine if it's not a numeric ID
  last_order_name: { type: String },
  orders_count: { type: Number },
  phone: { type: String },
  state: { type: String },
  tags: { type: String },
  tax_exempt: { type: Boolean },
  total_spent: { type: Number }, // Changed to Number for consistency in calculations
  updated_at: { type: Date },
  verified_email: { type: Boolean },
});

export default mongoose.model("ShopifyCustomer", shopifyCustomerSchema);
