const Joi = require("@hapi/joi");

const authSchema = Joi.object({
  id: Joi.number(),
  name: Joi.string().min(3),
  email: Joi.string().email().lowercase().required(),
});

module.exports = {
  authSchema,
};
