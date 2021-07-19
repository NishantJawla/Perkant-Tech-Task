const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret = require("../utility/secret");
const User = require("../models/user");
const statusCodes = require("../utility/statuscodes")
exports.signupHandler = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(statusCodes.BAD_REQUEST).json({
      status: statusCodes.BAD_REQUEST,
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ name: req.body.name }).exec((err, user) => {
    if (user) {
      return res.status(statusCodes.BAD_REQUEST).json({
        status: statusCodes.BAD_REQUEST,
        error: "User with this name already exist!",
      });
    }
    bcrypt.hash(req.body.plainPassword, saltRounds, (err, hash) => {
      const user = new User(req.body);
      user.encryptedPassword = hash;
      user.save((err, user) => {
        if (err || !user) {
          console.log(err);
          return res.status(statusCodes.BAD_REQUEST).json({
            status: statusCodes.BAD_REQUEST,
            error: "Failed to save user",
          });
        }
        res.status(statusCodes.OK).json({
          status: statusCodes.OK,
          msg: "User Created Succesfully",
        });
      });
    });
  });
};

exports.loginHandler = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(statusCodes.BAD_REQUEST).json({
      status: statusCodes.BAD_REQUEST,
      msg: errors.array()[0].msg,
      error: errors.array()[0].msg,
    });
  }
  User.findOne({ name: req.body.name }).exec((err, user) => {
    if (err || !user) {
      if (err) {
        console.log("some error occured");
      }
      return res.status(statusCodes.BAD_REQUEST).json({
        error: "User with this name does not exist",
      });
    }
    if (user) {
      bcrypt.compare(
        req.body.plainPassword,
        user.encryptedPassword,
        function (err, result) {
          if (result != true) {
            return res.status(statusCodes.BAD_REQUEST).json({
              error: "Please Enter correct Password",
            });
          } else {
            const payload = {
              id: user.id,
              name: user.name,
            };
            jwt.sign(
              payload,
              secret.SECRET,
              { expiresIn: "30m" },
              (err, token) => {
                return res.status(statusCodes.OK).json({
                  token: "Bearer " + token,
                  msg: "User succesfully loggedin!",
                });
              }
            );
          }
        }
      );
    }
  });
};

exports.getUserHandler = (req, res) => {
  res.status(statusCodes.OK).json({
    msg: "Succesfully Loaded Data",
    name: req.user.name,
  });
};
