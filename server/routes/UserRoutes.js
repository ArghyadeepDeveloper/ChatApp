import express from "express";
import { body, validationResult } from "express-validator";
import { registerUser } from "../controllers/UserControllers.js";
import { validationError } from "../middlewares/ValidationError.js";

const userRoutes = express.Router();

userRoutes.post(
  "/register",

  [
    body("username")
      .isLength({ min: 5 })
      .withMessage("Username must be at least 5 characters long"),
    body("email").isEmail().withMessage("Email is invalid"),
    body("password")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  validationError,
  registerUser
);

export default userRoutes;
