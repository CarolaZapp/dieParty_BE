import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    return next();
  }
  res.status(422).send({ errors: validationErrors.array() });
};
