const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.getAllUsers);
router.get("/users/:username", userController.getUserByUsername);
router.post("/users", userController.createUser);
router.put("/users/:username", userController.updateUser);
router.delete("/users/:username", userController.deleteUser);

module.exports = router;
