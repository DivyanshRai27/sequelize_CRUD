const service = require("../service/user.service");
const { authSchema } = require("../validators/user.validator");

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

controller.sendEmail = async (req, res, next) => {
  try {
    //   const user = await models.User.findAll({
    //     attributes: ["email"],
    //   });
    //   for (let i = 0; i < user.length; i++) {
    //     console.log(user[i].email);
    //   }
    //   res.json(user[1]);
    cron.schedule("*/2 * * * * *", () => {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "divyanshrai27@gmail.com",
          pass: "",
        },
      });
      var mailOptions = {
        from: "divyanshrai27@gmail.com",
        to: "divyanshrai0077@gmail.com",
        subject: "Sending email",
        text: `Hello how are you`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
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
