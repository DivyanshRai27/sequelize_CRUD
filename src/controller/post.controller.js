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

module.exports = controller;
