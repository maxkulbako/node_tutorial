import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { BadRequestError } from "../errors";
import jwt from "jsonwebtoken";

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
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

export const dashboard = (req: Request, res: Response) => {
  const { username } = req.user as { username: string; date: number };
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Here ${username} is your authorized data, your lucky number is ${luckyNumber}`,
  });
};
