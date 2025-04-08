//users table.. -->userModel
const userModel = require("../models/UserModel")
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil");
const jwt = require("jsonwebtoken");
const secret = "secret";

const loginUser = async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  const foundUserFromEmail = await userModel.findOne({ email: email }).populate("roleId");
  console.log(foundUserFromEmail);

  if (foundUserFromEmail != null) {

    const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
    if (isMatch == true) {
      res.status(200).json({
        message: "login success",
        data: foundUserFromEmail,
      });
    } else {
      res.status(404).json({
        message: "invalid cred..",
      });
    }
  } else {
    res.status(404).json({
      message: "Email not found..",
    });
  }
};

const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    const createdUser = await userModel.create(req.body);
    res.status(201).json({
      message: "user created..",
      data: createdUser,
    });
  } catch (err) {

    console.log(err)
    res.status(500).json({
      message: "error",
      data: err,
    });
  }
};

const addUser = async (req, res) => {

  const savedUser = await userModel.create(req.body)

  res.json({
    message: "user created....",
    data: savedUser
  });
};

//getUser

const getAllUsers = async (req, res) => {


  const users = await userModel.find().populate("roleId") //[{}]

  res.json({
    message: "user fetched successfully",
    data: users
  });
};

//deleteUser

const deleteUser = async (req, res) => {

  const deleteUser = await userModel.findByIdAndDelete(req.params.id)

  res.json({
    message: "role deleted successfully..",
    data: deleteUser
  })

}
//getUserById

const getUserById = async (req, res) => {

  //req.params.id

  const getUserById = await userModel.findById(req.params.id)
  res.json({
    message: "role fatched..",
    data: getUserById
  })

}

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const foundUser = await userModel.findOne({ email: email });

  if (foundUser) {
    const token = jwt.sign(foundUser.toObject(), secret);
    console.log(token);
    const url = `http://localhost:5173/resetpassword/${token}`;
    const mailContent = `<html>
                          <a href ="${url}">reset password</a>
                          </html>`;
    //email...
    await mailUtil.sendingMail(foundUser.email, "reset password", mailContent);
    res.json({
      message: "reset password link sent to mail.",
    });
  } else {
    res.json({
      message: "user not found register first..",
    });
  }
};

const resetpassword = async (req, res) => {
  const token = req.body.token; 
  const newPassword = req.body.password;

  const userFromToken = jwt.verify(token, secret);

  const salt = bcrypt.genSaltSync(10);
  const hashedPasseord = bcrypt.hashSync(newPassword,salt);

  const updatedUser = await userModel.findByIdAndUpdate(userFromToken._id, {
    password: hashedPasseord,
  });
  res.json({
    message: "password updated successfully..",
  });
};


module.exports = {
  addUser, getAllUsers, deleteUser, getUserById, signup, loginUser, resetpassword, forgotPassword
};