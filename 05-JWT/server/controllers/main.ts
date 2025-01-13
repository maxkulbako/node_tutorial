import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
const { createCustomError } = require("../errors/custom-error");
import jwt from "jsonwebtoken";

interface CustomJwtPayload {
  username: string;
  date: number;
}

const login = (req: Request, res: Response) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    throw createCustomError("Please provide email and password", 400);
  }

  const token = jwt.sign(
    { username, date: new Date().getDate() },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d",
    }
  );

  res.status(200).json({ msg: "user created", token });
};

const dashboard = (req: Request, res: Response) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw createCustomError("No token provided", 401);
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as CustomJwtPayload;

    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
      msg: `Here ${decoded.username} is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw createCustomError("Not authorized to access this route", 401);
  }
};

module.exports = { login, dashboard };
