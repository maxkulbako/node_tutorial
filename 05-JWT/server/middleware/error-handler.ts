import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { CustomAPIError } from "../errors";
import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({ msg: err.message });
    return;
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    msg: "Something went wrong, try again",
  });
};
