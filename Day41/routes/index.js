const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const checkLogin = require("../middleware/loginMiddleware");

// Route login
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

// Route home
router.get("/", checkLogin, authController.getHome);

// Route logout
router.get("/logout", authController.getLogout);

module.exports = router;
