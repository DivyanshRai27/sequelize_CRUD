const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const router = express.Router();
var sequelize = require("sequelize");

const controller = require("../controller/post.controller");

//Models
const models = require("../models");

// Get all posts
router.get("/", controller.getPost);
// Create post
router.post("/", controller.registerPost);
// Update post
router.post("/:id", controller.updatePost);
// Delete post
// router.get("/:id", async (req, res) => {
//   await models.Post.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((success) => res.redirect("/posts"))
//     .catch((err) => res.render("error", { error: err.message }));
// });

router.get("/:id", controller.deletePost);

module.exports = router;
