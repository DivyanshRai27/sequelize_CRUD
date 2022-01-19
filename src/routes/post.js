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

// router.get("/", (req, res) => {
//   models.Post.findAll()
//     .then((posts) => {
//       client.get("posts", (error, posts) => {
//         if (error) {
//           console.log(error);
//         }
//         if (posts != null) {
//           console.log("redis hit");
//           res.json({
//             success: true,
//             message: "Your post was created successfully!",
//             data: {
//               posts,
//             },
//           });
//         } else {
//           console.log("redis miss");
//           client.set("posts", JSON.stringify(posts));
//           res.json({
//             success: true,
//             message: "Your post was created successfully!",
//             data: {
//               posts,
//             },
//           });
//         }
//       });
//     })
//     .catch((err) => console.log(err));
// });

module.exports = router;
