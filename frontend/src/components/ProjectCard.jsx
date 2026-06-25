import React, { useState } from 'react'
import API from '../utils/api'
import CustomDropdown from './CustomDropdown'

const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'completed', label: 'Completed' }
]

const ProjectCard = ({ project, clientId, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editName, setEditName] = useState(project.projectName)
    const [editBrief, setEditBrief] = useState(project.projectBrief || '')
    const [editAmount, setEditAmount] = useState(project.amount)
    const [editStatus, setEditStatus] = useState(project.status)

    async function handleSave() {
        try {
            await API.patch(`/clients/${clientId}/project/${project._id}`, {
                projectName: editName,
                projectBrief: editBrief,
                amount: editAmount,
                status: editStatus
            })
            onUpdate(project._id, {
                projectName: editName,
                projectBrief: editBrief,
                amount: editAmount,
                status: editStatus
            })
            setIsEditing(false)
        } catch(err) {
            console.log(err)
        }
    }

    async function handleDelete() {
        if(window.confirm('Delete this project?')) {
            try {
                await API.delete(`/clients/${clientId}/project/${project._id}`)
                onDelete(project._id)
            } catch(err) {
                console.log(err)
            }
        }
    }

    return (
        <div className="glass-panel rounded-2xl p-6 w-full">
            {isEditing ? (
                <div className="space-y-3">
                    <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/10 text-text-primary text-sm rounded-xl px-3 py-2 outline-none focus:border-brand/50 transition-all"
                        placeholder="Project Name"
                    />
                    <textarea
                        value={editBrief}
                        onChange={(e) => setEditBrief(e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/10 text-text-primary text-sm rounded-xl px-3 py-2 outline-none focus:border-brand/50 transition-all h-16 resize-none"
                        placeholder="Project Brief"
                    />
                    <input
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/10 text-text-primary text-sm rounded-xl px-3 py-2 outline-none focus:border-brand/50 transition-all"
                        placeholder="Amount"
                    />
                    <CustomDropdown
                        value={editStatus}
                        onChange={setEditStatus}
                        options={statusOptions}
                    />
                </div>
            ) : (
                <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                        {project.projectName}
                    </h3>
                    {project.projectBrief && (
                        <p className="text-text-muted text-sm mt-1">
                            {project.projectBrief}
                        </p>
                    )}
                    <p className="text-text-primary font-medium mt-2">
                        ₹{project.amount?.toLocaleString()}
                    </p>
                    <span className={`text-xs px-2.5 py-1 rounded-lg border mt-2 inline-block ${
                        project.status === 'completed'
                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                            : project.status === 'inactive'
                            ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                            : 'bg-white/5 text-text-muted border-white/10'
                    }`}>
                        {project.status}
                    </span>
                </div>
            )}

            <div className="flex items-center justify-end gap-2 mt-4">
                {isEditing ? (
                    <>
                        <button
                            onClick={() => setIsEditing(false)}
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
                            onClick={handleDelete}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium px-4 py-2 rounded-xl transition-all border border-red-500/20"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProjectCard