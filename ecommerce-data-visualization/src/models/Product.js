const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  _id: String, // Unique identifier for the product, assuming it matches the id field
  admin_graphql_api_id: String, // Shopify's GraphQL API ID
  body_html: { type: String, default: null }, // Product description (can be null)
  created_at: Date, // Timestamp when the product was created
  handle: String, // Product handle (URL-friendly identifier)
  id: String, // Same as _id, Shopify's unique product ID
  image: { type: Object, default: null }, // Main product image (can be null)
  images: { type: Array, default: [] }, // Array of additional product images
  options: { type: Array, default: [] }, // Product options (like size, color)
  product_type: String, // The type of product (e.g., "ThMx")
  published_at: { type: Date, default: null }, // Timestamp when the product was published
  published_scope: { type: String, default: "web" }, // Scope of publication (e.g., "web")
  status: { type: String, default: "active" }, // Status of the product (e.g., "active")
  tags: { type: String, default: "" }, // Tags associated with the product
  template_suffix: { type: String, default: null }, // Custom template suffix
  title: String, // Product title
  updated_at: Date, // Timestamp when the product was last updated
  variants: { type: Array, default: [] }, // Variants of the product (like different sizes, colors)
  vendor: String, // Vendor name
});

module.exports = mongoose.model("Product", ProductSchema);
export default Product;
