const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signin = (req, res) => {
  User.findOne({
    userName: req.body.userName,
  }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (!user.role || !user.role === "admin")
        return res
          .status(400)
          .json({ message: "Customer login portal or Check user role" });
      if (await user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRECT,
          {
            expiresIn: process.env.TOKEN_EXPIRE_ON,
          }
        );
        const { first_Name, surName, userName, role, fullName, _id } = user;
        res.cookie("token", token, { expiresIn: process.env.TOKEN_EXPIRE_ON });
        res.status(200).json({
          token,
          user: {
            first_Name,
            surName,
            userName,
            role,
            fullName,
            _id,
          },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password or Email",
        });
      }
    } else {
      return res.status(400).json({ message: "Password or email is invalid" });
    }
  });
};

const signup = (req, res) => {
  const users = req.body.registered_users;
  //ADD BULK USERS
  if (users) {
    const response = users.map((data) => {
      User.findOne({ userName: data.userName }).exec(async (error, user) => {
        if (!user) {
          const { first_Name, surName, userName, password } = data;
          const hash_password = await bcrypt.hash(password, 10);
          const _user = new User({
            first_Name,
            userName: userName,
            surName,
            userName,
            hash_password,
            role: "admin",
          });
          _user.save((error, data_) => {
            if (error) {
             
            }
            if (data_) {
            }
          });
        }
      });
    });
    return res.status(201).json({
      message: "Action was successful",
    });
  } else {
    //ADD A SINGLE USER
    User.findOne({ userName: req.body.userName }).exec(async (error, user) => {
      if (user) {
        return res.status(400).json({
          message: "Admin already exist",
        });
      }
      const { first_Name, surName, userName, password } = req.body;
      const hash_password = await bcrypt.hash(password, 10);
      const _user = new User({
        first_Name,
        surName,
        userName,
        hash_password,
        role: "admin",
      });
      _user.save((error, data) => {
        if (error) {
          return res
            .status(400)
            .json({ message: "Error occured when creating your profile" });
        }
        if (data) {
          return res.status(201).json({
            user: data,
            message: "Action was successful",
          });
        }
      });
    });
  }
};

const signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully",
  });
};

module.exports = {
  signup,
  signin,
  signout,
 
};
