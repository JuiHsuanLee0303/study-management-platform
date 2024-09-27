require("dotenv").config();
const userService = require("../services/userService");
const encrypt = require("../utils/encrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const isUserExist = await userService.verifyEmail(email);
    if (!isUserExist) {
      res.status(401).json({ message: "Username or email not found" });
    } else {
      const isMatch = await userService.verifyUserByEmail(email, password);
      console.log(isMatch);
      if (isMatch) {
        const user = await userService.getUserByEmail(email);
        const token = jwt.sign(
          { id: user.id, username: user.username, email: user.email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1h",
          }
        );
        const refreshToken = jwt.sign(
          { id: user.id, username: user.username, email: user.email },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "7d",
          }
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed" });
  }
};

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const isUsername = await userService.verifyUsername(username);
    const isEmail = await userService.verifyEmail(email);
    if (isUsername) {
      res.status(409).json({ message: "Username already exists" });
    } else if (isEmail) {
      res.status(409).json({ message: "Email already exists" });
    } else {
      const newUser = await userService.createUser({
        username,
        password: await encrypt.hashPassword(password),
        email,
      });
      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verify = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = jwt.sign(
      { username: decoded.username, email: decoded.email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token: newAccessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  register,
  verify,
  refresh,
};
