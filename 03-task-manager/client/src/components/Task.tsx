import { ITask } from "../types/Task";
import doneSVG from "../assets/done.svg";
import circleSVG from "../assets/circle.svg";
import editSVG from "../assets/edit.svg";
import deleteSVG from "../assets/delete.svg";

interface TaskProps {
  task: ITask;
  onDelete: (id: string) => void;
}

export const Task: React.FC<TaskProps> = ({ task, onDelete }) => {
  return (
    <div
      className="flex items-center gap-2 bg-gray-600 p-2 rounded-md w-1/2"
      key={task._id}
    >
      <img
        src={task.completed ? doneSVG : circleSVG}
        alt="run"
        className="w-6 h-6"
      />
      <h1 className="flex-1 text-2xl font-bold text-start">{task.name}</h1>
      <div className="flex items-center gap-2">
        <button>
          <img src={editSVG} alt="edit" className="w-6 h-6" />
        </button>
        <button onClick={() => onDelete(task._id)}>
          <img src={deleteSVG} alt="delete" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
