require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { mongoose } = require("./database");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

//Swagger
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Pets API",
    version: "3.0.0",
  },
  servers: [
    {
      url: "http://localhost:8000",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/pets"],
};

//CORS
var cors = require("cors");
app.use(cors());

//Settings
app.set("port", process.env.PORT || 8000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

//Routes
app.use("/pets", require("./routes/pets"));

//Static Files
app.use(express.static("public"));

app.listen(app.get("port"), function () {
  console.log("port " + app.get("port"));
});
