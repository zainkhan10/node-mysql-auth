"use strict";
const mysql = require("mysql");
require('dotenv').config()
const { DB_NAME, DB_PASS, DB_USER } = process.env;
//local mysql db connection
const dbConn = mysql.createConnection({
  host: "localhost",
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});
dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;