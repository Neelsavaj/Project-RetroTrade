const ProductModel = require("../models/ProductModel")
const multer = require("multer");
const cloudinaryUtil = require("../utils/CloudnaryUtil");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});


const upload = multer({
  storage: storage,
}).single("image");


const addProduct = async (req, res) => {
  try {
    const savedProduct = await ProductModel.create(req.body);
    res.status(201).json({
      message: "Product added successfully",
      data: savedProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

const getAllProduct = async (req, res) => {

  try {

    const Products = await ProductModel.find();
    res.status(200).json({
      message: "All Products fetched successfully",
      data: Products
    })

  } catch (err) {

    res.status(500).json({
      message: err
    })

  }

}

const updateProduct = async (req, res) => {

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: "error while update product",
      err: err,
    });
  }
};

const getAllProductsByUserId = async (req, res) => {
  try {
    const products = await ProductModel
      .find({ userId: req.params.userId })
      .populate("userId");
    if (products.length === 0) {
      res.status(404).json({ message: "No Products found" });
    } else {
      res.status(200).json({
        message: "Product found successfully",
        data: products,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {

  const deletedproduct = await ProductModel.findByIdAndDelete(req.params.id)

  res.json({
    message: "product deleted successfully..",
    data: deletedproduct
  })
}

const addProductWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: err.message,
      });
    } else {

      const cloundinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
        req.file
      );
      console.log(cloundinaryResponse);
      console.log(req.body);

      req.body.productURL = cloundinaryResponse.secure_url;
      const savedProduct = await ProductModel.create(req.body);

      res.status(200).json({
        message: "product saved successfully",
        data: savedProduct,
      });
    }
  });
};

const getProductById = async (req, res) => {

  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "No product found" });
    } else {
      res.status(200).json({
        message: "Product found successfully",
        data: product,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getProductByCategoryId = async (req, res) => {
  try {
    const products = await ProductModel
      .find({ categoryId: req.params.categoryId })
      .populate("categoryId");
    if (products.length === 0) {
      res.status(404).json({ message: "No Products found" });
    } else {
      res.status(200).json({
        message: "Product found successfully",
        data: products,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  addProduct, getAllProduct, updateProduct, deleteProduct, getAllProductsByUserId, addProductWithFile, getProductById, getProductByCategoryId
}