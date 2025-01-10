import { Request, Response, NextFunction } from "express";
const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const getAllTasks = asyncWrapper(async (req: Request, res: Response) => {
  const tasks = await Task.find({});
  res
    .status(200)
    .json({ status: "success", data: { tasks, amount: tasks.length } });
});

const createTask = asyncWrapper(async (req: Request, res: Response) => {
  const task = await Task.create(req.body);
  res.status(201).json({ status: "success", data: { task } });
});

const getSingleTask = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return next(createCustomError(`No task with id: ${taskID}`, 404));
    }
    res.status(200).json({ status: "success", data: { task } });
  }
);

const updateTask = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return next(createCustomError(`No task with id: ${taskID}`, 404));
    }
    res.status(200).json({ status: "success", data: { task } });
  }
);

const deleteTask = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return next(createCustomError(`No task with id: ${taskID}`, 404));
    }
    res.status(200).json({ status: "success", data: { task } });
  }
);

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
