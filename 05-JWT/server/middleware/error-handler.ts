import { Request, Response, NextFunction } from "express";
const { CustomAPIError } = require("../errors/custom-error");

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomAPIError) {
    console.log(err);
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: "Something went wrong, try again" });
};

module.exports = errorHandlerMiddleware;
