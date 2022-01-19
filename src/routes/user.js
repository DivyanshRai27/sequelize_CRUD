const express = require("express");
const router = express.Router();
const cron = require("node-cron");
var nodemailer = require("nodemailer");

const client = require("../utils/redis");

// Model
const models = require("../models");
const controller = require("../controller/user.controller");

//routes
router.get("/", controller.getUser);
router.post("/register", controller.registerUser);

router.get("/cron-job", (req, res) => {
  cron.schedule("*/10 * * * * *", () => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "divyanshrai27@gmail.com",
        pass: "",
      },
    });

    var mailOptions = {
      from: "divyanshrai27@gmail.com",
      to: "divyanshrai0077@gmail.com",
      subject: "Sending email",
      text: `Hello how are you`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });
});

module.exports = router;
