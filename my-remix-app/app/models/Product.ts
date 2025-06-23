import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  
product_name: { type: String, required: true },
  description: { type: String },
  initial_price: { type: Number },
  final_price: { type: Number },
  currency: { type: String },
  in_stock: { type: Boolean, default: true },
  color: { type: [String] },
  size: { type: [String] },
  reviews_count: { type: Number, default: 0 },
  main_image: { type: String },
  category_url: { type: String },
  url: { type: String },
  category_tree: { type: [String] },
  country_code: { type: String },
  domain: { type: String },
  image_count: { type: Number },
  image_urls: { type: [String] },
  model_number: { type: String },
  offers: { type: [String] },
  other_attributes: { type: mongoose.Schema.Types.Mixed },
  product_id: { type: String, unique: true },
  rating: { type: Number },
  related_products: { type: [String] },
  root_category: { type: String },
  top_reviews: { type: [mongoose.Schema.Types.Mixed] },
  category: { type: String },
  brand: { type: String },
  all_available_sizes: { type: [String] },

});

export const Product = mongoose.models.Product || mongoose.model("products", productSchema);
