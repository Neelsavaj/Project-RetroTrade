const paymentModel = require("../models/PaymentModel")

const addPayment = async (req, res) => {
  try {
    const savedPayment = await paymentModel.create(req.body);
    res.status(201).json({
      message: "Payment added successfully",
      data: savedPayment,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await paymentModel.find().populate("buyerId");
    if (payments.length === 0) {
      res.status(404).json({ message: "No Payment found" });
    } else {
      res.status(200).json({
        message: "Payments found successfully",
        data: payments,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePayment = async (req, res) => {
  
    try {
      const updatedPayment = await paymentModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({
        message: "Payment updated successfully",
        data: updatedPayment,
      });
    } catch (err) {
      res.status(500).json({
        message: "error while update payment",
        err: err,
      });
    }
};

const deletePayment = async (req, res) => {

  const deletedpayment = await paymentModel.findByIdAndDelete(req.params.id)

  res.json({
    message: "payment deleted successfully..",
    data: deletedpayment
  })
}
module.exports = {addPayment,getAllPayments,updatePayment,deletePayment};
