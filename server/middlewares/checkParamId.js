import { param, validationResult } from "express-validator";
import mongoose from "mongoose";

const validateId = (parameter) => [
  param(parameter)
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid ID format");
      }
      return true;
    })
    .withMessage("ID is invalid"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateId;
