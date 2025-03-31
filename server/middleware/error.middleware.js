// @ts-nocheck

import { NotFoundError } from "../src/errors.js";

export const errorHandler = (err, _req, res, _next) => {
  // Render the error page
  res.status(("status" in err && err.status) || 500);
  res.json({
    title: "status" in err ? err.status : err.name,
    message: err.message,
  });
};

export const errorNotFoundHandler = (_req, _res, next) => {
  next(new NotFoundError("Not Found"));
};
