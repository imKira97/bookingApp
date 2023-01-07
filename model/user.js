const Sequelize = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  phoneNo: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    unique: true,
  },
});

module.exports = User;
