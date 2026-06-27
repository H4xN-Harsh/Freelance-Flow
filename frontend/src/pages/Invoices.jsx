import React, { useEffect, useState } from 'react'
import API from '../utils/api'
import { useAuth } from '../context/AuthContext'
import CustomDropdown from '../components/CustomDropdown'

const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Paid' },
    { value: 'overdue', label: 'Overdue' }
]

const statusColors = {
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    paid: 'bg-green-500/10 text-green-400 border-green-500/20',
    overdue: 'bg-red-500/10 text-red-400 border-red-500/20'
}

const Invoices = () => {
    const [invoices, setInvoices] = useState([])
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const { loading: authLoading } = useAuth()

    // Form states
    const [clientId, setClientId] = useState('')
    const [projectId, setProjectId] = useState('')
    const [amount, setAmount] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [formError, setFormError] = useState('')

    useEffect(() => {
        if(authLoading) return;
        async function fetchData() {
            try {
                const [invoicesRes, clientsRes] = await Promise.all([
                    API.get('/invoice/allInvoices'),
                    API.get('/clients/all')
                ])
                setInvoices(invoicesRes.data.invoices)
                setClients(clientsRes.data.clients)
            } catch(err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [authLoading])

    const selectedClient = clients.find(c => c._id === clientId)

    const clientOptions = clients.map(c => ({
        value: c._id,
        label: c.clientName
    }))

    const projectOptions = selectedClient?.project?.map(p => ({
        value: p._id,
        label: p.projectName
    })) || []

    async function handleCreate(e) {
        e.preventDefault()
        try {
            const res = await API.post('/invoices/create', {
                clientId, projectId, amount, dueDate
            })
            setInvoices(prev => [...prev, res.data.invoice])
            setShowModal(false)
            setClientId(''); setProjectId(''); setAmount(''); setDueDate('')
        } catch(err) {
            setFormError(err.response?.data?.message || 'Something went wrong')
        }
    }

    async function handleStatusUpdate(invoiceId, newStatus) {
        try {
            await API.patch(`/invoice/${invoiceId}`, { status: newStatus })
            setInvoices(prev => prev.map(inv =>
                inv._id === invoiceId ? { ...inv, status: newStatus } : inv
            ))
        } catch(err) {
            console.log(err)
        }
    }

    async function handleDelete(invoiceId) {
        if(window.confirm('Delete this invoice?')) {
            try {
                await API.delete(`/invoices/${invoiceId}`)
                setInvoices(prev => prev.filter(inv => inv._id !== invoiceId))
            } catch(err) {
                console.log(err)
            }
        }
    }

    if(loading) {
        return (
            <div className="min-h-screen bg-bg-surface flex items-center justify-center">
                <p className="text-text-muted">Loading Invoices...</p>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen bg-bg-surface text-text-primary pt-28 pb-12 px-4">
            <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-brand/20 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-brand-glow/15 rounded-full blur-[110px] pointer-events-none" />

            <div className="max-w-6xl mx-auto space-y-6 relative z-10">

                {/* Header */}
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                        Invoices
                    </h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-brand hover:bg-brand/90 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all"
                    >
                        + Create Invoice
                    </button>
                </div>

                {/* Invoices List */}
                {invoices.length === 0 ? (
                    <p className="text-text-muted text-sm">No invoices yet.</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {invoices.map(inv => (
                            <div key={inv._id} className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                
                                {/* Left — Invoice info */}
                                <div className="space-y-1">
                                    <p className="text-text-primary font-semibold">{inv.invoiceNo}</p>
                                    <p className="text-text-muted text-sm">
                                        Amount: <span className="text-text-primary font-medium">₹{inv.amount?.toLocaleString()}</span>
                                    </p>
                                    <p className="text-text-muted text-sm">
                                        Due: {new Date(inv.dueDate).toLocaleDateString('en-IN')}
                                    </p>
                                    <span className={`text-xs px-2.5 py-1 rounded-lg border inline-block ${statusColors[inv.status]}`}>
                                        {inv.status}
                                    </span>
                                </div>

                                {/* Right — Actions */}
                                <div className="flex items-center gap-3">
                                    <div className="w-40">
                                        <CustomDropdown
                                            value={inv.status}
                                            onChange={(val) => handleStatusUpdate(inv._id, val)}
                                            options={statusOptions}
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleDelete(inv._id)}
                                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium px-4 py-2 rounded-xl transition-all border border-red-500/20"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Create Invoice Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="glass-panel w-full max-w-md p-6 rounded-2xl">
                        <h2 className="text-xl font-semibold text-text-primary mb-4">Create Invoice</h2>
                        
                        {formError && <p className="text-red-400 text-sm mb-3">{formError}</p>}

                        <form onSubmit={handleCreate} className="space-y-4">
                            
                            {/* Client */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
                                    Client
                                </label>
                                <CustomDropdown
                                    value={clientId}
                                    onChange={(val) => { setClientId(val); setProjectId('') }}
                                    options={clientOptions}
                                    placeholder="Select Client"
                                />
                            </div>

                            {/* Project */}
                            {clientId && (
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
                                        Project
                                    </label>
                                    <CustomDropdown
                                        value={projectId}
                                        onChange={setProjectId}
                                        options={projectOptions}
                                        placeholder="Select Project"
                                    />
                                </div>
                            )}

                            {/* Amount */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
                                    Amount (₹)
                                </label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                    placeholder="e.g. 25000"
                                    className="w-full bg-white/[0.02] border border-white/10 text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-all"
                                />
                            </div>

                            {/* Due Date */}
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    required
                                    className="w-full bg-white/[0.02] border border-white/10 text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-all"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 rounded-xl text-sm text-text-muted hover:bg-white/5 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-brand hover:bg-brand/90 text-white text-sm font-medium py-3 rounded-xl transition-all"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Invoices