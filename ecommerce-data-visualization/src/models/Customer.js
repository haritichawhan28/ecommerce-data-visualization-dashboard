import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  _id: String, // Assuming MongoDB ObjectId is not used here, but the string ID from Shopify
  addresses: Array, // Array to hold multiple addresses if any
  admin_graphql_api_id: String,
  created_at: Date,
  currency: String,
  default_address: {
    type: Object,
    required: false, // If it can be null or undefined
  },
  email: String,
  email_marketing_consent: Object,
  first_name: String,
  id: Number, // Same as _id but numeric type
  last_name: String,
  last_order_id: { type: Number, default: null },
  last_order_name: { type: String, default: null },
  multipass_identifier: { type: String, default: null },
  note: { type: String, default: null },
  orders_count: { type: Number, default: 0 },
  phone: { type: String, default: null },
  sms_marketing_consent: { type: Object, default: null },
  state: { type: String, default: "disabled" },
  tags: { type: String, default: "" },
  tax_exempt: { type: Boolean, default: false },
  tax_exemptions: { type: Array, default: [] },
  total_spent: { type: String, default: "0.00" },
  updated_at: Date,
  verified_email: { type: Boolean, default: true },
});

const Customer = mongoose.model("Customer", customerSchema);

export { Customer }; // Named export
