const CategoryModel = require("../models/CategoryModel")

const addCategory = async (req, res) => {
  try {
    const savedCategory = await CategoryModel.create(req.body);
    res.status(201).json({
      message: "Category added successfully",
      data: savedCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const getAllCategory = async (req, res) => {

  try {

    const Categories = await CategoryModel.find();
    res.status(200).json({
      message: "All Categories fetched successfully",
      data: Categories
    })

  } catch (err) {

    res.status(500).json({
      message: err
    })

  }

}

module.exports = {
  addCategory, getAllCategory
}