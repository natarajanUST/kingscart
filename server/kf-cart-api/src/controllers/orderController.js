const { getOrderDetailsById, getAllOrderDetails, createNewOrder, cancelOrder, updateOrder } = require("../models/Order");

exports.getOrderById= async (req, res, next) => {
 try {
    const { orderId } = req.params;
    const order = await getOrderDetailsById(orderId);
    if (!order) {
            return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders= async (req, res, next) => {
 try {
    const order = await getAllOrderDetails();
    if (!order) {
            return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const orderData = req.body;
    const newOrder = await createNewOrder(orderData);
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
};

exports.cancelOrder = async(req, res, next) => {
  try {
    const { orderId, reason } = req.body;
    const updatedOrder = await updateOrder(orderId, 'cancelled');
    if (updatedOrder) {
      const addCancelReason = await cancelOrder(orderId, reason);
      if (!addCancelReason) {
        return res.status(404).json({ message: 'Order not found or cancellation failed' });
      }
      const order = await getOrderDetailsById(orderId);
       if (!order) {
            return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
    } 
   return res.status(404).json({ message: 'Order not found or cancellation failed' });  
  } catch (err) {
    next(err);
  }
}

exports.updateOrderStatus = async(req, res, next) => {
  try {
    const { orderId, status } = req.body;
    const updatedOrder = await updateOrder(orderId, status);
     if (!updatedOrder) {
       return res.status(404).json({ message: 'Order not found or update failed' });
    }
    const order = await getOrderDetailsById(orderId);
     if (!order) {
            return res.status(404).json({ message: 'Order not found' });
    }
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
}