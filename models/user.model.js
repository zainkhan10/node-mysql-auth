"use strict";
const dbConn = require("../config/db.config");

// User object create
var User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.status = user.status ? user.status : 1;
  this.created_at = new Date();
  this.updated_at = new Date();
};

// User creation
User.create = function (newUser, result) {
  dbConn.query("INSERT INTO users set ?", newUser, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

// Get user by ID
User.findById = function (id, result) {
  dbConn.query("Select * from users where id = ? ", id, function (err, res) {
    if (err) result(err, null);
    else if (res.length > 0) result(null, res[0]);
    else result("User not found", null);
  });
};

// Get user by username
User.findByUsername = function (username, result) {
  dbConn.query(
    "Select * from users where username = ? ",
    username,
    function (err, res) {
      if (err) result(err, null);
      else if (res.length > 0) result(null, res[0]);
      else result("User not found", null);
    }
  );
};

module.exports = User;
