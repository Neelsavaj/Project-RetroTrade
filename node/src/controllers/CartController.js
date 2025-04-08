const cartModel = require("../models/CartModel");

const addCart = async (req, res) => {
  try {
    const  savedCart= await cartModel.create(req.body);
    res.status(201).json({
      message: "Cart added successfully",
      data: savedCart,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllCart = async (req, res) => {
  try {
    const carts = await cartModel.find().populate("userId");
    if (carts.length === 0) {
      res.status(404).json({ message: "No Cart found" });
    } else {
      res.status(200).json({
        message: "Cart found successfully",
        data: carts,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCart = async (req, res) => {
  
    try {
      const updatedCart = await cartModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({
        message: "Cart updated successfully",
        data: updatedCart,
      });
    } catch (err) {
      res.status(500).json({
        message: "error while update Cart",
        err: err,
      });
    }
};

const deleteCart = async (req, res) => {

  const deletedCart = await cartModel.findByIdAndDelete(req.params.id)

  res.json({
    message: "Cart deleted successfully..",
    data: deletedCart
  })
}

const getCartByUserId = async (req, res) => {
    try {
      const carts = await cartModel
        .find({ userId: req.params.userId })
        .populate("userId");
      if (carts.length === 0) {
        res.status(404).json({ message: "No cart found" });
      } else {
        res.status(200).json({
          message: "cart found successfully",
          data: carts,
        });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
module.exports = {addCart,getAllCart,updateCart,deleteCart,getCartByUserId};
