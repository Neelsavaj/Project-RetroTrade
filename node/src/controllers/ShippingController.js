const shippingModel = require("../models/ShippingModel")

const addShipping = async (req, res) => {
  try {
    const savedShipping = await shippingModel.create(req.body);
    res.status(201).json({
      message: "shipping added successfully",
      data: savedShipping,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllShipings = async (req, res) => {
  try {
    const shippings = await shippingModel.find().populate("paymentId");
    if (shippings.length === 0) {
      res.status(404).json({ message: "No shipping found" });
    } else {
      res.status(200).json({
        message: "shippings found successfully",
        data: shippings,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateShipping = async (req, res) => {
  
    try {
      const updatedShipping = await shippingModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({
        message: "shipping updated successfully",
        data: updatedShipping,
      });
    } catch (err) {
      res.status(500).json({
        message: "error while update shipping",
        err: err,
      });
    }
};

const deleteShipping = async (req, res) => {

  const deletedShipping = await shippingModel.findByIdAndDelete(req.params.id)

  res.json({
    message: "shipping deleted successfully..",
    data: deletedShipping
  })
}
module.exports = {addShipping,getAllShipings,updateShipping,deleteShipping};