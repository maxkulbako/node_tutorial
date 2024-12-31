require("./db/connect");
require("dotenv").config();
const express = require("express");
const app: Express = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
import { Express, Request, Response } from "express";

//middleware
app.use(express.json());

//routes
app.get("/", (req: Request, res: Response) => {
  console.log(req);
  res.send("Task Manager API");
});

app.use("/api/v1/tasks", tasks);

// app.get("/api/v1/tasks") - get all tasks
// app.post("/api/v1/tasks") - create a new task
// app.get("/api/v1/tasks/:id") - get a single task
// app.patch("/api/v1/tasks/:id") - update a task
// app.delete("/api/v1/tasks/:id") - delete a task

const start = async () => {
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
