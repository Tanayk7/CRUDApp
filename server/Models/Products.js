const mongoose = require("mongoose");

const products = new mongoose.Schema({
  owner: String, // email of the user
  name: String,
  category: String,
  price: Number,
  size: String,
  stock: Number,
  description: String,
});
const Products = mongoose.model("Products", products);
module.exports = Products;
