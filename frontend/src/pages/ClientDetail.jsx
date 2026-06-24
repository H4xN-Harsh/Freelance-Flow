import React, { useEffect, useState } from 'react'
import API from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';

const ClientDetail = () => {
    const [clientDetails, setClientDetails] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [editName, setEditName] = useState('')
    const [editEmail, setEditEmail] = useState('')
    const [editPh, setEditPh] = useState('')
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getDets() {
            try {
                const res = await API.get(`/clients/${id}`);
                setClientDetails(res.data.client)
                setEditName(res.data.client.clientName)
                setEditEmail(res.data.client.clientEmail)
                setEditPh(res.data.client.clientPh || '')
            } catch(err) {
                console.log(err);
            }
        }
        getDets();
    }, [])

    async function handleUpdate() {
        try {
            await API.patch(`/clients/${id}`, {
                clientName: editName,
                clientEmail: editEmail,
                clientPh: editPh
            });
            setClientDetails(prev => ({
                ...prev,
                clientName: editName,
                clientEmail: editEmail,
                clientPh: editPh
            }))
            setIsEditing(false)
        } catch(err) {
            console.log(err)
        }
    }

    async function handleDelete() {
        if(window.confirm('Are you sure? This will delete the client permanently.')) {
            try {
                await API.delete(`/clients/${id}`);
                navigate('/clients')
            } catch(err) {
                console.log(err)
            }
        }
    }

    return (
        <div className="relative min-h-screen bg-bg-surface text-text-primary pt-28 pb-12 px-4">
            <div className='absolute top-1/3 left-1/4 w-80 h-80 bg-brand/20 rounded-full blur-[130px] pointer-events-none' />
            <div className='absolute bottom-1/3 right-1/4 w-72 h-72 bg-brand-glow/15 rounded-full blur-[110px] pointer-events-none' />
            
            <div className='max-w-6xl mx-auto space-y-6 relative z-10'>
                
                {/* Client Info Card */}
                <div className='glass-panel rounded-2xl p-6 w-full md:w-1/3 '>
                    
                    {isEditing ? (
                        <div className='space-y-3'>
                            <input
                                type='text'
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className='w-full bg-white/[0.02] border border-white/10 text-text-primary text-sm rounded-xl px-3 py-2 outline-none focus:border-brand/50 transition-all'
                                placeholder='Client Name'
                            />
                            <input
                                type='email'
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                                className='w-full bg-white/[0.02] border border-white/10 text-text-primary text-sm rounded-xl px-3 py-2 outline-none focus:border-brand/50 transition-all'
                                placeholder='Client Email'
                            />
                            <input
                                type='text'
                                value={editPh}
                                onChange={(e) => setEditPh(e.target.value)}
                                className='w-full bg-white/[0.02] border border-white/10 text-text-primary text-sm rounded-xl px-3 py-2 outline-none focus:border-brand/50 transition-all'
                                placeholder='Phone (optional)'
                            />
                        </div>
                    ) : (
                        <div>
                            <h1 className='text-lg font-semibold text-text-primary'>{clientDetails.clientName}</h1>
                            <p className='text-text-muted text-sm mt-1'>{clientDetails.clientEmail}</p>
                            <p className='text-text-muted text-sm mt-1'>{clientDetails.clientPh || '—'}</p>
                        </div>
                    )}

                    <div className='flex items-center justify-between mt-4'>
                        <button
                            onClick={handleDelete}
                            className='bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium px-4 py-2 rounded-xl transition-all border border-red-500/20'
                        >
                            Delete
                        </button>
                        
                        {isEditing ? (
                            <div className='flex gap-2'>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className='text-text-muted text-xs font-medium px-4 py-2 rounded-xl transition-all hover:bg-white/5'
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className='bg-brand hover:bg-brand/90 text-white text-xs font-medium px-4 py-2 rounded-xl transition-all'
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className='bg-white/5 hover:bg-white/10 text-text-muted text-xs font-medium px-4 py-2 rounded-xl transition-all'
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>
                {/* showing projects */}
                <div>projects</div>
        </div>
    )
}

export default ClientDetail