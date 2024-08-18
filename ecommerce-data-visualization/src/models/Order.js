import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  _id: String, // Unique identifier for the order, assuming it matches the id field
  id: String, // Same as _id, to match the Shopify order ID
  email: String,
  closed_at: { type: Date, default: null },
  created_at: Date,
  updated_at: Date,
  number: Number, // Order number
  note: { type: String, default: null },
  token: { type: String, default: "" },
  gateway: String, // Payment gateway used
  test: { type: Boolean, default: false },
  total_price: String, // Total price of the order
  subtotal_price: String, // Subtotal price of the order
  total_weight: { type: Number, default: 0 }, // Total weight of the order
  total_tax: String, // Total tax for the order
  taxes_included: { type: Boolean, default: true },
  currency: String, // Currency code (e.g., INR)
  financial_status: String, // Status of the payment (e.g., paid)
  confirmed: { type: Boolean, default: true },
  total_discounts: { type: String, default: "0.00" },
  buyer_accepts_marketing: { type: Boolean, default: false },
  name: String, // Order name or number
  referring_site: { type: String, default: null },
  landing_site: { type: String, default: null },
  cancelled_at: { type: Date, default: null },
  cancel_reason: { type: String, default: null },
  reference: { type: String, default: null },
  user_id: { type: Number, default: null },
  location_id: { type: Number, default: null },
  source_identifier: { type: String, default: null },
  source_url: { type: String, default: null },
  device_id: { type: String, default: null },
  phone: { type: String, default: null },
  customer_locale: { type: String, default: "en" },
  app_id: Number, // ID of the app used to create the order
  browser_ip: { type: String, default: "" },
  landing_site_ref: { type: String, default: null },
  order_number: Number, // Numeric order number
  discount_applications: { type: Array, default: [] },
  discount_codes: { type: Array, default: [] },
  note_attributes: { type: Array, default: [] },
  payment_gateway_names: { type: Array, default: [] },
  processing_method: { type: String, default: "direct" },
  source_name: { type: String, default: "web" },
  fulfillment_status: { type: String, default: null },
  tax_lines: { type: Array, default: [] },
  tags: { type: String, default: "" },
  contact_email: { type: String, default: null },
  order_status_url: { type: String, default: "" },
  presentment_currency: { type: String, default: "INR" },
  total_line_items_price_set: { type: Object, default: {} },
  total_discounts_set: { type: Object, default: {} },
  total_shipping_price_set: { type: Object, default: {} },
  subtotal_price_set: { type: Object, default: {} },
  total_price_set: { type: Object, default: {} },
  total_tax_set: { type: Object, default: {} },
  line_items: { type: Array, default: [] }, // Items in the order
  shipping_lines: { type: Array, default: [] }, // Shipping details
  billing_address: { type: Object, default: null },
  shipping_address: { type: Object, default: null },
  fulfillments: { type: Array, default: [] },
  client_details: { type: Object, default: null },
  refunds: { type: Array, default: [] },
  customer: { type: Object, default: {} }, // Customer information related to the order
  total_line_items_price: { type: String, default: "0.00" }, // Total price of line items
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
