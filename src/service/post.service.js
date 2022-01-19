const { Post } = require("../models");

let service = {};

service.getPost = async () => {
  const posts = await Post.findAll();
  return posts;
};

service.createPost = async (body) => {
  const post = await Post.create(body);
  return post;
};

service.updatePost = async (title, body) => {
  const post = await Post.update(
    { title: title },
    {
      where: {
        id: body,
      },
    }
  );
  return post;
};

service.deletePost = async (body) => {
  const post = await Post.destroy({
    where: {
      id: body,
    },
  });
  return post;
};

module.exports = service;
