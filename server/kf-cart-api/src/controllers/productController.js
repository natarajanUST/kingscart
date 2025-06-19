const Product = require("../models/Product");
const esClient = require("../config/elastic");

exports.create = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    await esClient.index({
      index: "products",
      id: product._id.toString(),
      document: product.toObject(),
    });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
};
