import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors";

interface CustomJwtPayload {
  username: string;
  date: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        username: string;
        date: number;
      };
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as CustomJwtPayload;

    const { username, date } = decoded;
    req.user = { username, date };

    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};
