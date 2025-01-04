require("./db/connect");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const express = require("express");
const app: Express = express();
const tasks: Router = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
import { Express, Router } from "express";

//middleware
app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use("/api/v1/tasks", tasks);
app.use(notFound);

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
