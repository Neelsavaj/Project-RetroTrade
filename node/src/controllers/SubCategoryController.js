const SubCategoryModel = require("../models/SubCategoryModel")

const addSubCategory = async (req, res) => {
    try {
        const savedCategory = (await SubCategoryModel.create(req.body));
        res.status(201).json({
            message: "SubCategory added successfully",
            data: savedCategory,
        });
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    }
};

const getAllSubCategory = async (req, res) => {

    try {

        const SubCategories = await SubCategoryModel.find();
        res.status(200).json({
            message: "All SubCategories fetched successfully",
            data: SubCategories
        })

    } catch (err) {

        res.status(500).json({
            message: err
        })

    }

}

const getSubCategoryByCategoryId = async (req, res) => {
    try {
      const subcategories = await SubCategoryModel.find({ categoryId: req.params.categoryId });
      res.status(200).json({
        message: "subcategory found",
        data: subcategories,
      });
    } catch (err) {
      res.status(500).json({
        message: "subcategory  not found",
      });
    }
  };
module.exports = {
    addSubCategory,getAllSubCategory,getSubCategoryByCategoryId
};