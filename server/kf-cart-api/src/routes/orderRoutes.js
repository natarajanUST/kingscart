const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

console.log("Order Routes Loaded");
router.post("/save", orderController.createOrder);
router.get("/getAllOrder", orderController.getAllOrders);
router.get("/getOrderById/:orderId", orderController.getOrderById);
router.post("/cancelOrder", orderController.cancelOrder);
router.post("/updateStatus", orderController.updateOrderStatus);

module.exports = router;