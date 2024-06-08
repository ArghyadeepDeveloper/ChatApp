import { body, validationResult } from "express-validator";

export const validationError = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else next();
  } catch (err) {
    console.log(err);
  }
};
