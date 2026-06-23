import React, { useEffect, useState } from "react";
import API from "../utils/api";
import CustomDropdown from "./CustomDropdown"; // ← import add karo

const CreateTask = ({ onClose, onSuccess }) => {
  const [clients, setClients] = useState([]);
  const [clId, setClId] = useState("");
  const [pId, setPId] = useState("");
  const [taskTit, setTaskTit] = useState("");
  const [taskDes, setTaskDes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await API.get("/clients/all");
        setClients(res.data.clients);
      } catch (err) {
        console.log(err);
      }
    }
    fetchClients();
  }, []);

  const selectedClient = clients.find((c) => c._id === clId);

  const clientOptions = clients.map((c) => ({
    value: c._id,
    label: c.clientName,
  }));

  const projectOptions = selectedClient?.project?.map((p) => ({
    value: p._id,
    label: p.projectName,
  })) || [];

  async function handleSub(e) {
    e.preventDefault();
    try {
      const res = await API.post("/tasks/createTask", {
        clientId: clId,
        projectId: pId,
        title: taskTit,
        description: taskDes,
      });
      onSuccess(res.data.task);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="glass-panel w-full max-w-md p-6 rounded-2xl">
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          Create New Task
        </h2>

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSub} className="space-y-4">
          
          {/* Client dropdown */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-primary mb-2">
              Select Client
            </label>
            <CustomDropdown
              value={clId}
              onChange={(val) => { setClId(val); setPId(""); }}
              options={clientOptions}
              placeholder="Select Client"
            />
          </div>

          {/* Project dropdown — sirf tab dikhe jab client select ho */}
          {clId && (
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
                Select Project
              </label>
              <CustomDropdown
                value={pId}
                onChange={setPId}
                options={projectOptions}
                placeholder="Select Project"
              />
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
              Task Title
            </label>
            <input
              type="text"
              value={taskTit}
              onChange={(e) => setTaskTit(e.target.value)}
              required
              placeholder="e.g. Design homepage"
              className="w-full bg-white/[0.02] border border-white/10 text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
              Description (optional)
            </label>
            <textarea
              value={taskDes}
              onChange={(e) => setTaskDes(e.target.value)}
              placeholder="Task details..."
              className="w-full bg-white/[0.02] border border-white/10 text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-all h-20 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm text-text-muted hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-brand hover:bg-brand/90 text-white text-sm font-medium py-3 rounded-xl transition-all"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;