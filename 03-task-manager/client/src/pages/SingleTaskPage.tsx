import { useState, useEffect } from "react";
import { ITask } from "../types/Task";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const SingleTaskPage: React.FC = () => {
  const [task, setTask] = useState<ITask | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const getSingleTask = async (): Promise<void> => {
    try {
      const { data } = await axios.get<{ task: ITask }>(
        `http://localhost:3000/api/v1/tasks/${id}`
      );
      setTask(data.task);
    } catch (error) {
      console.error("Failed to fetch the task:", error);
    }
  };

  const updateTaskData = async (): Promise<void> => {
    if (!task) return;
    try {
      await axios.patch(`http://localhost:3000/api/v1/tasks/${id}`, {
        name: task.name,
      });
      console.log("Task name updated successfully");
    } catch (error) {
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
    <div className="flex flex-col items-center gap-10 pt-24 w-2/3 h-96 mx-auto">
      <div className="flex items-center gap-2">
        <h1 className="text-4xl font-bold p-2">Name: </h1>
        <input
          className="text-4xl font-bold bg-gray-600 p-2 rounded-md"
          value={task?.name || ""}
          onChange={(e) => handleNameChange(e.target.value)}
        />
        <input
          type="checkbox"
          checked={task?.completed}
          onChange={(e) => handleIsCompleted(e.target.checked)}
        />
      </div>
      <div></div>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={updateTaskData}
      >
        SAVE CHANGES
      </button>
      <button
        className="bg-white text-lg text-black font-bold p-2 rounded-md"
        onClick={() => navigate("/")}
      >
        GO TO THE TASKS LIST
      </button>
    </div>
  );
};
