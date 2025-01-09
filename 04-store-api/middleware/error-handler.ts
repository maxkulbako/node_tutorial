import { Request, Response, NextFunction } from "express";

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  return res.status(500).json({ msg: "Something went wrong, try again" });
};

module.exports = errorHandlerMiddleware;
