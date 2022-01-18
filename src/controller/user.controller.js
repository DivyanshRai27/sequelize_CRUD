const service = require("../service/user.service");
const { authSchema } = require("../validator-schema");

let controller = {};

controller.registerUser = async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);

    await service.createUser(result);

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

controller.getUser = async (req, res, next) => {
  try {
    const user = await service.getUser();
    return res.json({
      success: true,
      message: "All the registered Users",
      data: { user },
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
