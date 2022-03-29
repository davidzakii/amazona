const express = require("express");
const data = require("../data");
const Product = require("../models/productModel");
const User = require("../models/userModel");

const seedRouter = express.Router();

seedRouter.get("/", async (req, res, next) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  await User.remove();
  const craeteUser = await User.insertMany(data.users);
  res.send({ createdProducts, craeteUser });
});

module.exports = seedRouter;
