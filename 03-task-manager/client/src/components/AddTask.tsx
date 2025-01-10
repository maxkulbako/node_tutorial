import { useState } from "react";

interface AddTaskProps {
  onAdd: ({ name }: { name: string }) => void;
}

export const AddTask = ({ onAdd }: AddTaskProps) => {
  const [taskName, setTaskName] = useState("");

  const handleAddTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    onAdd({ name: taskName });
    setTaskName("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form
        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 
                      rounded-xl p-6 shadow-lg"
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-white">Add New Task</h2>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Textarea */}
          <div className="relative">
            <textarea
              placeholder="What needs to be done?"
              className="w-full min-h-[120px] bg-gray-900/50 text-white rounded-lg 
                         border border-gray-700 p-4 resize-none
                         placeholder:text-gray-500
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                         focus:outline-none transition duration-200"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <div className="absolute bottom-3 right-3 text-gray-500 text-sm">
              {taskName.length}/100
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end">
            <button
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600
                         hover:from-blue-600 hover:to-blue-700
                         text-white font-medium rounded-lg
                         transform transition duration-200
                         hover:scale-[1.02] active:scale-[0.98]
                         focus:outline-none focus:ring-2 focus:ring-blue-500/50
                         disabled:opacity-50 disabled:cursor-not-allowed
                         disabled:hover:scale-100"
              onClick={handleAddTask}
              disabled={!taskName.trim()}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Add Task</span>
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
