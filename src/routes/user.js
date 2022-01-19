const express = require("express");
const router = express.Router();
const cron = require("node-cron");
var nodemailer = require("nodemailer");

const client = require("../utils/redis");

// Model
const models = require("../models");
const controller = require("../controller/user.controller");
const { json } = require("body-parser");

//routes
router.get("/", controller.getUser);
router.post("/register", controller.registerUser);
router.get("/cron-job", controller.sendEmail);

module.exports = router;
