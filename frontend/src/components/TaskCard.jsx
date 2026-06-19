import React, { useState } from "react";
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities'; // ← ye install/import karo

const TaskCard = ({ task }) => {
  const [isHovered, setHovered] = useState(false);
  const TaskClient = task.clientId?.clientName;
  const TaskClientEmail = task.clientId?.clientEmail;
  const taskTit = task.title;
  const Taskstatus = task.status;

  const { attributes, listeners, setNodeRef, transform ,isDragging } = useDraggable({ id: task._id });

  
  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}  
      {...attributes}
      {...listeners}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`mt-3 glass-panel rounded-2xl p-6 transition-all duration-300 ease-in-out cursor-grab ${
        isDragging ? "scale-[1.03] shadow-lg shadow-brand/10" : "scale-100"
      }`}
    >
      <h3 className="text-lg font-semibold text-text-primary">{TaskClient}</h3>
      <p className="text-text-muted text-sm mt-1">{TaskClientEmail}</p>
      <h3 className="text-lg font-semibold text-text-primary">{taskTit}</h3>
      <h5>{Taskstatus}</h5>
    </div>
  );
};

export default TaskCard;