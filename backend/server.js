const express = require("express");
const cors = require("cors");
const data = require("./data");
const mongoose = require("mongoose");
const seedRouter = require("./routes/seedRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connect to db");
  })
  .catch((err) => {
    console.log(err.message);
  });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use("/api/seed", seedRouter);
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
// app.use("*", (err, req, res, next) => {
//   res.status(404).send("page not found");
//   next();
// });
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server listen at https://localhost:${port}`);
});
