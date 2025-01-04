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
  const [error, setError] = useState<{ isError: boolean; message: string }>({
    isError: false,
    message: "",
  });

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
      setError({ isError: false, message: "" });
      await axios.post("http://localhost:3000/api/v1/tasks", { name });
      getTasks();
    } catch (err) {
      setError({
        isError: true,
        message: "Failed to add task. Please try again.",
      });
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
    <div className="flex flex-col items-center gap-10  p-10 bg-gradient-to-br from-gray-800 to-gray-900">
      <AddTask onAdd={addTask} />

      {/* Error Message */}
      {error.isError && (
        <div className="w-full max-w-2xl animate-fade-in">
          <div
            className="bg-red-500/20 border border-red-500 text-red-400 
                        px-4 py-3 rounded-lg flex items-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-medium">{error.message}</p>
          </div>
        </div>
      )}

      {/* Tasks */}
      <div className="flex flex-col-reverse items-center gap-4 w-full">
        {tasks.map((task) => (
          <Task task={task} onDelete={deleteTask} key={task._id} />
        ))}
      </div>
    </div>
  );
};
