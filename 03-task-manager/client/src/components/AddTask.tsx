import { useState } from "react";
interface AddTaskProps {
  onAdd: ({ name }: { name: string }) => void;
}

export const AddTask = ({ onAdd }: AddTaskProps) => {
  const [taskName, setTaskName] = useState("");

  const handleAddTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onAdd({ name: taskName });
    setTaskName("");
  };

  return (
    <div className="flex flex-col items-center gap-2 w-1/2 h-48 w-2/3">
      <form className="flex flex-col gap-5 w-full h-full items-center">
        <textarea
          placeholder="Task name"
          className="w-full h-full rounded-md p-2 text-2xl text-top resize-none"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button
          className="w-32 h-10 bg-blue-500 text-white rounded-md"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};
