const express = require("express");
const router = express.Router();
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
router.get("/:id", controller.deletePost);

module.exports = router;
