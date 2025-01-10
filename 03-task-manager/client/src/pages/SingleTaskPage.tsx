import { useState, useEffect } from "react";
import { ITask } from "../types/Task";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface APIResponse {
  status: string;
  data: {
    task: ITask;
  };
}

export const SingleTaskPage: React.FC = () => {
  const [task, setTask] = useState<ITask | null>(null);
  const { id } = useParams<{ id: string }>();
  const [isSuccess, setIsSuccess] = useState<boolean | "">("");
  const navigate = useNavigate();

  const getSingleTask = async (): Promise<void> => {
    try {
      const { data }: { data: APIResponse } = await axios.get(
        `http://localhost:3000/api/v1/tasks/${id}`
      );
      setTask(data.data.task);
    } catch (error) {
      console.error("Failed to fetch the task:", error);
    }
  };

  const updateTaskData = async (): Promise<void> => {
    if (!task) return;
    try {
      const { data }: { data: APIResponse } = await axios.patch(
        `http://localhost:3000/api/v1/tasks/${id}`,
        {
          name: task.name,
          completed: task.completed,
        }
      );
      setIsSuccess(data.status === "success");
    } catch (error) {
      setIsSuccess(false);
      getSingleTask();
      console.error("Failed to update the task name:", error);
    }
  };

  const handleNameChange = (name: string): void => {
    if (task) {
      setTask({ ...task, name });
    }
  };

  const handleIsCompleted = (completed: boolean): void => {
    if (task) {
      setTask({ ...task, completed });
    }
  };

  useEffect(() => {
    getSingleTask();
  }, [id]);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto bg-gray-700 rounded-xl shadow-2xl p-8 space-y-8">
        {/* Header */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-white">Task Details</h1>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* Task Name Input */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 text-sm font-medium">
              Task Name
            </label>
            <input
              className="text-xl bg-gray-800 text-white p-3 rounded-lg border border-gray-600 
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none
                       transition duration-200"
              value={task?.name || ""}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Enter task name..."
            />
          </div>

          {/* Completed Checkbox */}
          <div className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg">
            <input
              type="checkbox"
              id="completed"
              checked={task?.completed || false}
              onChange={(e) => handleIsCompleted(e.target.checked)}
              className="w-5 h-5 rounded text-blue-500 focus:ring-blue-500 focus:ring-2
                       cursor-pointer transition duration-200"
            />
            <label
              htmlFor="completed"
              className="text-white text-lg cursor-pointer"
            >
              Mark as completed
            </label>
          </div>
        </div>

        {/* Status Message */}
        <div
          className={`transition-all duration-300 transform 
                      ${
                        isSuccess === ""
                          ? "opacity-0 scale-95"
                          : "opacity-100 scale-100"
                      }`}
        >
          {isSuccess ? (
            <div className="bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-lg">
              <p className="font-medium">✓ Changes saved successfully!</p>
            </div>
          ) : isSuccess === false ? (
            <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-lg">
              <p className="font-medium">⚠ Failed to save. Please try again.</p>
            </div>
          ) : null}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 pt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg
                     transform transition duration-200 hover:scale-[1.02] active:scale-[0.98]
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                     focus:ring-offset-gray-700"
            onClick={updateTaskData}
          >
            Save Changes
          </button>

          <button
            className="bg-gray-800 hover:bg-gray-900 text-gray-300 font-medium py-3 px-6 
                     rounded-lg border border-gray-600 transform transition duration-200 
                     hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 
                     focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-700"
            onClick={() => navigate("/")}
          >
            Back to Tasks List
          </button>
        </div>
      </div>
    </div>
  );
};
