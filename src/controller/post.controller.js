const service = require("../service/post.service");
const client = require("../utils/redis");

let controller = {};

controller.getPost = async (req, res, next) => {
  try {
    const posts = await service.getPost();
    client.set("posts", JSON.stringify(posts));
    return res.json({
      success: true,
      message: "All posts!",
      data: {
        posts,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

controller.registerPost = async (req, res, next) => {
  try {
    const result = req.body;
    await service.createPost(result);

    return res.json({
      success: true,
      message: "You are successfully resigstered!",
      data: {},
    });
  } catch (error) {
    return res.json({
      success: true,
      message: error.message,
      data: {},
    });
  }
};

controller.updatePost = async (req, res, next) => {
  try {
    const title = req.body.title;
    const id = req.params.id;
    await service.updatePost(title, id);

    return res.json({
      success: true,
      message: "You have successfully updated!",
      data: {},
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

controller.deletePost = async (req, res, next) => {
  try {
    const result = req.params.id;
    await service.deletePost(result);

    return res.json({
      success: true,
      message: "You have successfully deleted!",
      data: {},
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
      data: {},
    });
  }
};

module.exports = controller;
