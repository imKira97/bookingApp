const Sequelize = require("sequelize");
const sequelize = new Sequelize("booking-appointment", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});
module.exports = sequelize;
