import mongoose, { Schema } from "mongoose";

export interface ITask {
  name: string;
  completed: boolean;
}

const TaskSchema: Schema<ITask> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxLength: [20, "name cannot be more than 20 characters"],
    minLength: [3, "name cannot be less than 3 characters"],
  },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model<ITask>("Task", TaskSchema);
