const express = require("express");
const authController = require("../controllers/auth.controller.js");
const identifyUser = require("../middlewares/auth.middleware.js");

const authRouter = express.Router();

/**
 * @route POST /api/auht/register
 */
authRouter.post("/register", authController.registerUser);

/**
 * @route POST /api/auth/login
 */
authRouter.post("/login", authController.loginUser);

/**
 * @route POST /api/auth/getMe
 * @description Get the current loggedIn user information
 */
authRouter.get("/getMe", identifyUser, authController.getMe);

module.exports = authRouter;