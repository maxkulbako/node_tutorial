require("dotenv").config();
require("express-async-errors");
const connectDB = require("./db/connect");
import { Request, Response, Router } from "express";
const express = require("express");
const app = express();
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const productsRouter: Router = require("./routes/products");

//middleware
app.use(express.json());

//routes

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/v1/products", productsRouter);

//product routes
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async (): Promise<void> => {
  try {
    await connectDB(process.env.CONNECTION_STRING);
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
