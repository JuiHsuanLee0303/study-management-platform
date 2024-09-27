require("dotenv").config();
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
  return bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hash) => {
  console.log(password, hash);
  return bcrypt.compare(password, hash);
};

module.exports = {
  hashPassword,
  comparePassword,
};
