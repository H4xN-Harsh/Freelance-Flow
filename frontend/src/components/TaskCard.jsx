import React, { useState } from "react";
import CustomDropdown from "./CustomDropdown";

const statusOptions = [
  { value: 'todo', label: 'Todo' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' }
];

const TaskCard = ({ task, onStatusChange, onDelete, onUpdate }) => {
  const [isHovered, setHovered] = useState(false);
  const [isEditing,setIsEditing] = useState(false);
  const [editTitle,setEditTitle] = useState(task.title);
  const [editDesc,setEditDesc] = useState(task.description||'')
  const TaskClient = task.clientId?.clientName;
  const TaskClientEmail = task.clientId?.clientEmail;
  const taskTit = task.title;
  const Taskstatus = task.status;
  async function handleSave() {
    await onUpdate(task._id, { title: editTitle, description: editDesc });
    setIsEditing(false);
  }

  function handleCancel() {
    setEditTitle(task.title);
    setEditDesc(task.description || '');
    setIsEditing(false);
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
      {/* <h3 className="text-lg font-semibold text-text-primary mt-2">{taskTit}</h3> */}
      {isEditing ? (
        <div className="mt-2 space-y-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full bg-white/[0.02] border border-white/10 text-text-primary text-sm rounded-xl px-3 py-2 outline-none focus:border-brand/50 transition-all"
          />
          <textarea
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            placeholder="Description..."
            className="w-full bg-white/[0.02] border border-white/10 text-text-primary text-sm rounded-xl px-3 py-2 outline-none focus:border-brand/50 transition-all h-16 resize-none"
          />
        </div>
      ) : (
        <div className="mt-2">
          <h3 className="text-lg font-semibold text-text-primary">{task.title}</h3>
          {task.description && (
            <p className="text-text-muted text-xs mt-1">{task.description}</p>
          )}
        </div>
      )}
      {/* Status dropdown */}
      <div className="mt-4">
        <CustomDropdown
          value={Taskstatus}
          onChange={(val) => onStatusChange(task._id, val)}
          options={statusOptions}
        />
      </div>

      {/* Delete button */}
      <div className="flex items-center justify-between mt-3">
        {isEditing ? (
          <>
            <button
              onClick={handleCancel}
              className="text-text-muted text-xs font-medium px-4 py-2 rounded-xl transition-all hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-brand hover:bg-brand/90 text-white text-xs font-medium px-4 py-2 rounded-xl transition-all"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white/5 hover:bg-white/10 text-text-muted text-xs font-medium px-4 py-2 rounded-xl transition-all"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium px-4 py-2 rounded-xl transition-all border border-red-500/20"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;