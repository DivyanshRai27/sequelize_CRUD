const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD App",
      version: "1.0.0",
      description: "CRUD application for posts",
      servers: ["http://localhost:3000"],
    },
  },
  apis: ["./routes/*.js"],
};

const router = express.Router();

//Body Parser
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/", require("./routes/user"));
app.use("/post", require("./routes/post"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
