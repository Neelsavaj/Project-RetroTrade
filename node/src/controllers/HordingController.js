const multer = require("multer");
const hordingModel = require("../models/HordingModel");
const cloudinaryUtil = require ("../utils/CloudnaryUtil")

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  //fileFilter:
}).single("image");

const addHording = async (req, res) => {
  try {
    const savedHording = await hordingModel.create(req.body);
    res.status(201).json({
      message: "Hording added successfully",
      data: savedHording,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllHordings = async (req, res) => {
  try {
    const hordings = await hordingModel.find().populate("stateId cityId areaId userId");
    if (hordings.length === 0) {
      res.status(404).json({ message: "No hordings found" });
    } else {
      res.status(200).json({
        message: "Hording found successfully",
        data: hordings,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addHordingWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: err.message,
      });
    } else {
      // database data store
      //cloundinary

      const cloundinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
      console.log(cloundinaryResponse);
      console.log(req.body);

      //store data in database
      req.body.hordingURL = cloundinaryResponse.secure_url
      const savedHording = await hordingModel.create(req.body);

      res.status(200).json({
        message: "hording saved successfully",
        data: savedHording
      });
    }
  });
};
module.exports = { addHording, getAllHordings, addHordingWithFile };