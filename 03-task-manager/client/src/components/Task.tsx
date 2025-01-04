import { ITask } from "../types/Task";
import doneSVG from "../assets/done.svg";
import circleSVG from "../assets/circle.svg";
import editSVG from "../assets/edit.svg";
import deleteSVG from "../assets/delete.svg";
import { NavLink } from "react-router-dom";
interface TaskProps {
  task: ITask;
  onDelete: (id: string) => void;
}

export const Task: React.FC<TaskProps> = ({ task, onDelete }) => {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(task._id);
  };

  return (
    <div
      className="flex items-center gap-2 bg-gray-600 p-2 rounded-md w-2/3 h-16"
      key={task._id}
    >
      <img
        src={task.completed ? doneSVG : circleSVG}
        alt="run"
        className="w-6 h-6"
      />
      <h1
        className={`flex-1 text-2xl font-bold text-start pl-4 ${
          task.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {task.name}
      </h1>
      <div className="flex items-center gap-2">
        <NavLink to={`/task/${task._id}`}>
          <img src={editSVG} alt="edit" className="w-6 h-6 z-10" />
        </NavLink>
        <button onClick={handleDelete}>
          <img src={deleteSVG} alt="delete" className="w-6 h-6 z-10" />
        </button>
      </div>
    </div>
  );
};
