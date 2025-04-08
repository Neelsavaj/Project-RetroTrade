const multer = require("multer");
const path = require("path");
const buyerModel = require("../models/BuyerModel");
const cloudinaryUtil = require ("../utils/CloudnaryUtil")

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});


const upload = multer({
  storage: storage,
}).single("image");

const addBuyer = async (req, res) => {
  try {
    const savedBuyer = await buyerModel.create(req.body);
    res.status(201).json({
      message: "Buyer added successfully",
      data: savedBuyer,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllBuyers = async (req, res) => {
  try {
    const buyers = await buyerModel.find().populate("userId");
    if (buyers.length === 0) {
      res.status(404).json({ message: "No Buyer found" });
    } else {
      res.status(200).json({
        message: "Buyer found successfully",
        data: buyers,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addBuyerWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: err.message,
      });
    } else {

      const cloundinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
      console.log(cloundinaryResponse);
      console.log(req.body);

      req.body.imageURL = cloundinaryResponse.secure_url
      const savedBuyer = await buyerModel.create(req.body);

      res.status(200).json({
        message: "buyer saved successfully",
        data: savedBuyer
      });
    }
  });
};

const getAllBuyersByUserId = async (req, res) => {
    try {
      const buyers = await buyerModel
        .find({ userId: req.params.userId })
        .populate("userId");
      if (buyers.length === 0) {
        res.status(404).json({ message: "No buyers found" });
      } else {
        res.status(200).json({
          message: "Buyer found successfully",
          data: buyers,
        });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
const updateBuyer = async (req, res) => {
  
    try {
      const updatedBuyer = await buyerModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({
        message: "Buyer updated successfully",
        data: updatedBuyer,
      });
    } catch (err) {
      res.status(500).json({
        message: "error while update buyer",
        err: err,
      });
    }
  };

const getBuyerById= async(req,res)=>{
  try {
    const buyer = await buyerModel.findById(req.params.id);
    if (!buyer) {
      res.status(404).json({ message: "No buyer found" });
    } else {
      res.status(200).json({
        message: "Buyer found successfully",
        data: buyer,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {addBuyer,getAllBuyers,addBuyerWithFile,getAllBuyersByUserId,updateBuyer,getBuyerById};