import React, { useState } from "react";
import API from "../utils/api";

const CreateProject = ({ onClose, onSuccess, clientDetails }) => {
  const [projectName, setProjectName] = useState("");
  const [projectBrief, setProjectBrief] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await API.post('/clients/create', {
        clientName: clientDetails.clientName,
        clientEmail: clientDetails.clientEmail,
        projectName, projectBrief, amount
      });
      onSuccess(res.data.client);
      onClose();
    } catch(err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="glass-panel w-full max-w-md p-6 rounded-2xl">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Add New Project</h2>
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
            className="w-full bg-white/[0.02] border border-white/10 text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-all"
          />
          <textarea
            placeholder="Project Brief"
            value={projectBrief}
            onChange={(e) => setProjectBrief(e.target.value)}
            className="w-full bg-white/[0.02] border border-white/10 text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-all h-20 resize-none"
          />
          <input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full bg-white/[0.02] border border-white/10 text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-all"
          />
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm text-text-muted hover:bg-white/5 transition-all">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 bg-brand hover:bg-brand/90 text-white text-sm font-medium py-3 rounded-xl transition-all">
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;