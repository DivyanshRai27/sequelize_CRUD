const express = require("express");
const router = express.Router();

const client = require("../utils/redis");

// Model
const models = require("../models");
const controller = require("../controller/user.controller");

//routes
router.get("/", controller.getUser);
router.post("/register", controller.registerUser);

module.exports = router;
