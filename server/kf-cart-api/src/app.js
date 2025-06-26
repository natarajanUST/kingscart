require("reflect-metadata"); // if you're using decorators

const AppDataSource = require("./config/data-source");
const express = require("express");
const app = express();

app.use(express.json());

// Routes
// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/products", require("./routes/productRoutes"));
// app.use("/api/cart", require("./routes/cartRoutes"));

app.use("/api/order", require("./routes/orderRoutes"));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

module.exports = app;
