import { Request, Response } from "express";

const getAllProducts = async (req: Request, res: Response) => {
  throw new Error("Testing async errors");
  res.send("All products");
};

export { getAllProducts };

module.exports = { getAllProducts };
