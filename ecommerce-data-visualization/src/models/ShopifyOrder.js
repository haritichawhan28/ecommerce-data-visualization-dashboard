import mongoose from "mongoose";

const shopifyOrderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: { type: Number, required: true }, // Shopify's order ID
  email: { type: String },
  closed_at: { type: Date },
  created_at: { type: Date, required: true },
  updated_at: { type: Date },
  number: { type: Number },
  token: { type: String },
  gateway: { type: String },
  test: { type: Boolean },
  total_price: { type: Number }, // Changed to Number for aggregation
  subtotal_price: { type: Number }, // Changed to Number for aggregation
  total_weight: { type: Number },
  total_tax: { type: Number }, // Changed to Number for aggregation
  taxes_included: { type: Boolean },
  currency: { type: String },
  financial_status: { type: String },
  confirmed: { type: Boolean },
  total_discounts: { type: Number }, // Changed to Number for aggregation
  buyer_accepts_marketing: { type: Boolean },
  name: { type: String },
  referring_site: { type: String },
  landing_site: { type: String },
  cancelled_at: { type: Date },
  cancel_reason: { type: String },
  reference: { type: String },
  user_id: { type: Number },
  location_id: { type: Number },
  source_identifier: { type: String },
  source_url: { type: String },
  device_id: { type: String },
  phone: { type: String },
  customer_locale: { type: String },
  app_id: { type: Number },
  browser_ip: { type: String },
  landing_site_ref: { type: String },
  order_number: { type: Number },
  discount_applications: { type: Array },
  discount_codes: { type: Array },
  note_attributes: { type: Array },
  payment_gateway_names: { type: Array },
  fulfillment_status: { type: String },
  tax_lines: { type: Array },
  tags: { type: String },
  contact_email: { type: String },
  order_status_url: { type: String },
  presentment_currency: { type: String },
  total_line_items_price_set: { type: Object },
  total_discounts_set: { type: Object },
  total_shipping_price_set: { type: Object },
  subtotal_price_set: { type: Object },
  total_price_set: { type: Object },
  total_tax_set: { type: Object },
  line_items: { type: Array },
  shipping_lines: { type: Array },
  billing_address: { type: Object },
  shipping_address: { type: Object },
  fulfillments: { type: Array },
  client_details: { type: Object },
  refunds: { type: Array },
  customer: {
    type: new mongoose.Schema({
      total_line_items_price: { type: Number }, // Changed to Number
      // Add other customer-related fields if needed
    }),
  },
});

export default mongoose.model("ShopifyOrder", shopifyOrderSchema);
