import React, { useState } from "react";

const statusLabels = {
  'todo': 'Todo',
  'in-progress': 'In Progress',
  'done': 'Done'
};

const statusColors = {
  'todo': 'text-text-muted',
  'in-progress': 'text-brand',
  'done': 'text-green-400'
};

const TaskCard = ({ task, onStatusChange }) => {
  const [isHovered, setHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const TaskClient = task.clientId?.clientName;
  const TaskClientEmail = task.clientId?.clientEmail;
  const taskTit = task.title;
  const Taskstatus = task.status;

  function handleSelect(status) {
    onStatusChange(task._id, status);
    setIsDropdownOpen(false);
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`mt-3 glass-panel rounded-2xl p-6 transition-all duration-300 ease-in-out relative ${
        isHovered ? "scale-[1.03] shadow-lg shadow-brand/10" : "scale-100"
      }`}
    >
      <h3 className="text-lg font-semibold text-text-primary">{TaskClient}</h3>
      <p className="text-text-muted text-sm mt-1">{TaskClientEmail}</p>
      <h3 className="text-lg font-semibold text-text-primary mt-2">{taskTit}</h3>

      {/* Custom dropdown */}
      <div className="relative mt-4">
        {/* Trigger button */}
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`w-full flex items-center justify-between bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5 text-sm font-medium transition-all hover:bg-white/[0.05] ${statusColors[Taskstatus]}`}
        >
          {statusLabels[Taskstatus]}
          <svg 
            className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown options — same transition jaisa mobile nav mein tha */}
        <div className={`absolute top-full left-0 right-0 mt-2 glass-panel rounded-xl p-1.5 z-10 transform origin-top transition-all duration-200 ease-out ${
          isDropdownOpen ? 'scale-y-100 opacity-100 translate-y-0' : 'scale-y-95 opacity-0 -translate-y-1 pointer-events-none'
        }`}>
          {Object.keys(statusLabels).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => handleSelect(status)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all hover:bg-white/5 ${
                Taskstatus === status ? `${statusColors[status]} font-medium` : 'text-text-muted'
              }`}
            >
              {statusLabels[status]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;