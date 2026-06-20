import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useAuth } from "../context/AuthContext";
import TaskCard from "../components/TaskCard";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const { loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgress = tasks.filter((task) => task.status === "in-progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  useEffect(() => {
    if (authLoading) return;
    async function getAllTask() {
      try {
        const res = await API.get("/tasks/getAllTasks");
        setTasks(res.data.tasks);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getAllTask();
  }, [authLoading]);

  async function updateTaskStatus(taskId, newStatus) {
    setTasks(prevT =>
      prevT.map(task => task._id === taskId ? {...task, status: newStatus} : task)
    );
    try {
      await API.patch(`/tasks/${taskId}`, { status: newStatus });
    } catch(err) {
      console.log(err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-surface flex items-center justify-center">
        <p className="text-text-muted">Loading Dashboard .....</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-bg-surface text-text-primary pt-28 pb-12 px-4">
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-brand/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-brand-glow/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight ">
            Tasks
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-brand hover:bg-brand/90 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all"
          >
            + Create Tasks
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-2xl p-4 min-h-[300px]">
            <h3 className="text-sm font-mono uppercase tracking-wider text-text-muted mb-3">
              Todo ({todoTasks.length})
            </h3>
            {todoTasks.map((task) => (
              <TaskCard key={task._id} task={task} onStatusChange={updateTaskStatus} />
            ))}
          </div>

          <div className="glass-panel rounded-2xl min-h-[300px] p-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-text-muted mb-3">
              In Progress ({inProgress.length})
            </h3>
            {inProgress.map((task) => (
              <TaskCard key={task._id} task={task} onStatusChange={updateTaskStatus} />
            ))}
          </div>

          <div className="glass-panel min-h-[300px] rounded-2xl p-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-text-muted mb-3">
              Done ({doneTasks.length})
            </h3>
            {doneTasks.map((task) => (
              <TaskCard key={task._id} task={task} onStatusChange={updateTaskStatus} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;