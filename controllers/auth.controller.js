"use strict";
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const { JWT_SECRET } = process.env;

exports.register = function (req, res) {
  const new_user = new User(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: "Username and password are required!" });
  } else {
    User.findByUsername(req.body.username, (err, response) => {
      if (err) {
        User.create(new_user, function (err, user) {
          if (err) res.send(err);
          res.json({
            message: "User registered successfully!",
            data: user,
            success: true,
          });
        });
      } else {
        res.json({ message: "Username already exist!", success: false });
      }
    });
  }
};

exports.login = function (req, res) {
  User.findByUsername(req.body.username, function (err, user) {
    if (err) {
      res.send({ success: false, message: err });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ success: true, token });
    });
  });
};

exports.userDetails = (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, JWT_SECRET);
    const user_id = decoded.user.id;
    User.findById(user_id, (err, result) => {
      if (err) {
        res.json({ message: "User not found", success: false });
      } else {
        res.json({ data: result, success: true });
      }
    });
  } catch (error) {
    res.json({ message: "Invalid token!", success: false });
  }
};
