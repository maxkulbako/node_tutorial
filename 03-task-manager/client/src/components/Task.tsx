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
    <div className="group animate-fade-in-down w-full max-w-2xl mx-auto">
      <div
        className="flex items-center gap-4 bg-gray-800/50 backdrop-blur-sm 
                      border border-gray-700/50 p-4 rounded-xl mb-4
                      transform transition-all duration-200 
                      hover:bg-gray-700/50 hover:scale-[1.01] w-full"
      >
        {/* Status Icon */}
        <div className="flex-shrink-0">
          <img
            src={task.completed ? doneSVG : circleSVG}
            alt={task.completed ? "completed" : "pending"}
            className={`w-6 h-6 transition-transform duration-200
                       ${task.completed ? "rotate-0" : "rotate-180"}
                       group-hover:scale-110`}
          />
        </div>

        {/* Task Name */}
        <div className="flex-1 min-w-0">
          <h2
            className={`text-xl font-medium truncate
                         transition-all duration-200 text-start
                         ${
                           task.completed
                             ? "text-gray-400 line-through"
                             : "text-white"
                         }`}
          >
            {task.name}
          </h2>
        </div>

        {/* Actions */}
        <div
          className="flex items-center gap-3 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-200"
        >
          {/* Edit Button */}
          <NavLink
            to={`/task/${task._id}`}
            className="p-2 rounded-lg hover:bg-gray-700 
                     transition-colors duration-200 "
          >
            <img
              src={editSVG}
              alt="edit"
              className="w-5 h-5 opacity-75 hover:opacity-100"
            />
          </NavLink>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg hover:bg-red-500/20 
                     transition-colors duration-200"
          >
            <img
              src={deleteSVG}
              alt="delete"
              className="w-5 h-5 opacity-75 hover:opacity-100"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
