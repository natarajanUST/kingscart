const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  attributes: Object,
});

module.exports = mongoose.model("Product", productSchema);
