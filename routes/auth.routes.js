const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Login user and return JWT token
router.post("/login", authController.login);

// Registered a new user
router.post("/register", authController.register);

// Get token and return user details
router.get("/user", authController.userDetails);

module.exports = router;
