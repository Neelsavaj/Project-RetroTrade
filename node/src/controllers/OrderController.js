const orderModel = require("../models/OrderModel");

const addOrder = async (req, res) => {
  try {
    const  savedOrder= await orderModel.create(req.body);
    res.status(201).json({
      message: "Order added successfully",
      data: savedOrder,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().populate("userId");
    if (orders.length === 0) {
      res.status(404).json({ message: "No Orders found" });
    } else {
      res.status(200).json({
        message: "Orders found successfully",
        data: orders,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateOrder = async (req, res) => {
  
    try {
      const updatedOrder = await orderModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({
        message: "Order updated successfully",
        data: updatedOrder,
      });
    } catch (err) {
      res.status(500).json({
        message: "error while update Order",
        err: err,
      });
    }
};

const deleteOrder = async (req, res) => {

  const deletedOrder = await orderModel.findByIdAndDelete(req.params.id)

  res.json({
    message: "Order deleted successfully..",
    data: deletedOrder
  })
}
module.exports = {addOrder,getAllOrders,updateOrder,deleteOrder};
