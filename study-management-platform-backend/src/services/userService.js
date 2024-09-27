const User = require("../models/userModel");
const encrypt = require("../utils/encrypt");

const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ where: { username } });
    return user;
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching users: " + error.message);
  }
};

const updateUser = async (username, updateData) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (user) {
      await user.update(updateData);
      return user;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
};

const deleteUser = async (username) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (user) {
      await user.destroy();
      return true;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
};

const verifyUserByUsername = async (username, password) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (user) {
      const isMatch = await encrypt.comparePassword(password, user.password);
      return isMatch;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error verifying user: " + error.message);
  }
};

const verifyUserByEmail = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const isMatch = await encrypt.comparePassword(password, user.password);
      return isMatch;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error("Error verifying user: " + error.message);
  }
};

const verifyUsername = async (username) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("Error verifying username: " + error.message);
  }
};

const verifyEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("Error verifying email: " + error.message);
  }
};

module.exports = {
  createUser,
  getUserByUsername,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
  verifyUserByUsername,
  verifyUserByEmail,
  verifyUsername,
  verifyEmail,
};
