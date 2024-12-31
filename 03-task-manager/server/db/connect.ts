const mongoose = require("mongoose");
import { Error } from "mongoose";

const connectDB = async (url: string) => {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to the DB...");
    })
    .catch((err: Error) => console.log(err));
};

module.exports = connectDB;
