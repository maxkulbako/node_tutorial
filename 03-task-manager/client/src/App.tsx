import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { ITask } from "./types/Task";
import { Task } from "./components/Task";
import { AddTask } from "./components/AddTask";
function App() {
  return (
    <>
      <div className="flex justify-center">
        <p className="text-3xl font-bold underline text-red-500">
          Task Manager App
        </p>
      </div>
      <TaskList />
    </>
  );
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const getTasks = async () => {
    try {
      const { data }: { data: { tasks: ITask[] } } = await axios.get(
        "http://localhost:3000/api/v1/tasks"
      );
      setTasks(data.tasks);
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
      {tasks.map((task) => (
        <Task task={task} onDelete={deleteTask} key={task._id} />
      ))}
    </div>
  );
};

export default App;
