const { User } = require("../models");

let service = {};

service.createUser = async (body) => {
  const user = await User.create(body);

  return user;
};

service.getUser = async () => {
  const user = await User.findAll();
  console.log(user);

  return user;
};

module.exports = service;
