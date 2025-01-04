import { useState, useEffect } from "react";
import axios from "axios";
import { ITask } from "../types/Task";
import { Task } from "../components/Task";
import { AddTask } from "../components/AddTask";

interface APIResponse {
  status: string;
  data: {
    tasks: ITask[];
    amount: number;
  };
}

export const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const getTasks = async () => {
    try {
      const { data }: { data: APIResponse } = await axios.get(
        "http://localhost:3000/api/v1/tasks"
      );
      setTasks(data.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async ({ name }: { name: string }) => {
    try {
      await axios.post("http://localhost:3000/api/v1/tasks", { name });
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      if (!id) return;
      await axios.delete(`http://localhost:3000/api/v1/tasks/${id}`);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex flex-col items-center gap-10  p-10">
      <AddTask onAdd={addTask} />
      <div className="flex flex-col items-center gap-4 w-full">
        {tasks.map((task) => (
          <Task task={task} onDelete={deleteTask} key={task._id} />
        ))}
      </div>
    </div>
  );
};
