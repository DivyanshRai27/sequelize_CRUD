const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const router = express.Router();
const { authSchema } = require("../validator-schema");

const client = require("../utils/redis");

const Bull = require("bull");
const myFirstQueue = new Bull("my-first-queue");

// Model
const models = require("../models");
const controller = require("../controller/user.controller");

router.get("/", controller.getUser);
router.post("/register", controller.registerUser);

router.get("/queue", async (req, res) => {
  const job = await myFirstQueue.add({
    foo: [
      {
        foo: "bar",
      },
      {
        name: "Divyansh",
      },
    ],
  });

  myFirstQueue.process(async (job) => {
    let progress = 0;
    console.log("hi");
    for (i = 0; i < 2; i++) {
      console.log(job.data.foo[i]);
      // await doSomething(job.data);
      progress += 10;
      console.log(progress);
      job.progress(progress);
    }
  });
});

module.exports = router;
