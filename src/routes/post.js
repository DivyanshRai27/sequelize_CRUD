const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const router = express.Router();
var sequelize = require("sequelize");

const client = require("../utils/redis");

//Models
const models = require("../models");

// Get all posts
router.get("/", (req, res) => {
  models.Post.findAll()
    .then((posts) => {
      client.set("posts", JSON.stringify(posts));
      res.json({
        success: true,
        message: "Your post was created successfully!",
        data: {
          posts,
        },
      });
    })
    .catch((err) => console.log(err));
});

// Create post
router.post("/", async (req, res) => {
  const t = await models.sequelize.transaction();
  try {
    const post_name = await models.Post.create(
      {
        id: req.body.id,
        title: req.body.title,
        user_id: req.body.user_id,
      },
      { transaction: t }
    );
    await t.commit().then((post) => res.redirect("/"));
  } catch (error) {
    await t.rollback();
  }
});

// Update post
router.post("/:id", async (req, res) => {
  await models.Post.update(
    { title: req.body.title },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((success) => res.redirect("/posts"))
    .catch((err) => res.render("error", { error: err.message }));
});

// Delete post
router.get("/:id", async (req, res) => {
  await models.Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((success) => res.redirect("/posts"))
    .catch((err) => res.render("error", { error: err.message }));
});

module.exports = router;
