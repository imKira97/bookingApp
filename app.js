const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
var cors = require("cors");
app.use(cors());

const sequelize = require("./database");

const userRoutes = require("./route/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(userRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
    console.log("server is running");
  })
  .catch((err) => {
    console.log(err);
  });
