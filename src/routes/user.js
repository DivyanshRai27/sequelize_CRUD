const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const router = express.Router();
const { authSchema } = require("../validator-schema");

const client = require("../utils/redis");

// Model
const models = require("../models");

// All users
router.get("/", (req, res) => {
  models.User.findAll()
    .then((user) => {
      client.set("users", user);
      res.json(user);
    })
    .catch((err) => console.log(err));
});

//  Create User
router.post("/create-user", async (req, res) => {
  const result = await authSchema.validateAsync(req.body);
  console.log(result);

  const user_name = await models.User.create({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
  })
    .then((user) => res.redirect("/"))
    .catch((err) => res.render("error", { error: err.message }));
});

module.exports = router;
