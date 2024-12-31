import { Request, Response } from "express";

const getAllTasks = (req: Request, res: Response) => {
  res.send("All tasks");
};

const createTask = (req: Request, res: Response) => {
  const { name } = req.body;
  res.json({ success: true, data: `name: ${name}` });
};

const getSingleTask = (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`Get a single task with id: ${id}`);
};

const updateTask = (req: Request, res: Response) => {
  res.send("Update a task");
};

const deleteTask = (req: Request, res: Response) => {
  res.send("Delete a task");
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
