const reviewModel = require("../models/ReviewModel");

const addReview = async (req, res) => {
  try {
    const savedReview = await reviewModel.create(req.body);
    res.status(201).json({
      message: "Review added successfully",
      data: savedReview,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find().populate("userId");
    if (reviews.length === 0) {
      res.status(404).json({ message: "No Review found" });
    } else {
      res.status(200).json({
        message: "Reviews found successfully",
        data: reviews,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateReview = async (req, res) => {
  
    try {
      const updatedReview = await reviewModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({
        message: "Review updated successfully",
        data: updatedReview,
      });
    } catch (err) {
      res.status(500).json({
        message: "error while update review",
        err: err,
      });
    }
};

const deleteReview = async (req, res) => {

  const deletedReview = await reviewModel.findByIdAndDelete(req.params.id)

  res.json({
    message: "review deleted successfully..",
    data: deletedReview
  })
}
module.exports = {addReview,getAllReviews,updateReview,deleteReview};
