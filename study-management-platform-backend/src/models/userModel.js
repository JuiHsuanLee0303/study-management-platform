require("dotenv").config();
const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: process.env.POSTGRES_USER_TABLE,
    timestamps: false,
  }
);

module.exports = User;
