// components/AddClientModal.jsx
import { useState } from 'react'
import API from '../utils/api'

const AddClientModal = ({ onClose, onSuccess }) => {
    const [clientName, setClientName] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [clientPh, setClientPh] = useState('')
    const [projectName, setProjectName] = useState('')
    const [projectBrief, setProjectBrief] = useState('')
    const [amount, setAmount] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const res = await API.post('/clients/create', {
                clientName, clientEmail, clientPh,
                projectName, projectBrief, amount
            })
            onSuccess(res.data.client)
            onClose()
        } catch(err) {
            setError(err.response?.data?.message || 'Something went wrong')
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="glass-panel w-full max-w-md p-6 rounded-2xl">
                <h2 className="text-xl font-semibold text-text-primary mb-4">Add New Client</h2>

                {error && (
                    <p className="text-red-400 text-sm mb-3">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
                            Client Name
                        </label>
                        <input
                            type="text"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            required
                            className="w-full glass-interactive bg-white/[0.02] text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            required
                            className="w-full glass-interactive bg-white/[0.02] text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
                            Phone (optional)
                        </label>
                        <input
                            type="text"
                            value={clientPh}
                            onChange={(e) => setClientPh(e.target.value)}
                            className="w-full glass-interactive bg-white/[0.02] text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-all"
                        />
                    </div>

                    <div className="border-t border-white/5 pt-4">
                        <p className="text-xs text-text-dim mb-3">First Project Details</p>

                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Project Name"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                required
                                className="w-full glass-interactive bg-white/[0.02] text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-all"
                            />
                            <textarea
                                placeholder="Project Brief"
                                value={projectBrief}
                                onChange={(e) => setProjectBrief(e.target.value)}
                                className="w-full glass-interactive bg-white/[0.02] text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-all h-20 resize-none"
                            />
                            <input
                                type="number"
                                placeholder="Amount (₹)"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                className="w-full glass-interactive bg-white/[0.02] text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-all"
                            />
                        </div>
                    </div>

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
                            Add Client
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddClientModal