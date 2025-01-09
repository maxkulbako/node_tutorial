import { Request, Response, RequestHandler } from "express";
import {
  ProductRequestParams,
  ProductRequestQuery,
  IProduct,
} from "../types/product";
const Product = require("../models/product");

const getAllProducts: RequestHandler = async (req: Request, res: Response) => {
  const { featured, company, name, sort, fields }: ProductRequestParams =
    req.query;
  console.log(req.query);
  const queryObject: ProductRequestQuery = {};
  if (featured) {
    queryObject.featured = featured;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    console.log(fieldsList);
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products: IProduct[] = await result;
  res.status(200).json({ products, nbHits: products.length });
};

export { getAllProducts };

module.exports = { getAllProducts };
