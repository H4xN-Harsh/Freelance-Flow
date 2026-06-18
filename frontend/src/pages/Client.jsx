import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../utils/api'
import { useAuth } from '../context/AuthContext'
import ClientCard from '../components/ClientCard'
import AddClientModal from '../components/AddClientModal'

const Client = () => {
    const [clients, setClients] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const { loading: authLoading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(authLoading) return
        fetchClients()
    }, [authLoading])

    async function fetchClients() {
        try {
            const res = await API.get('/clients/all')
            setClients(res.data.clients)
        } catch(err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    function handleNewClient(newClient) {
        // List mein naya client add karo bina refetch kiye
        setClients(prev => [...prev, newClient])
    }

    const filteredClients = clients.filter(client => 
        client.clientName.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="relative min-h-screen bg-bg-surface text-text-primary pt-28 pb-12 px-4">
            <div className="max-w-6xl mx-auto space-y-6 relative z-10">
                
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                        Clients
                    </h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-brand hover:bg-brand/90 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all"
                    >
                        + Add Client
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Search clients..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-80 glass-interactive bg-white/[0.02] text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-brand/50 transition-all placeholder:text-text-dim"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredClients.map(client => (
                        <div key={client._id} onClick={() => navigate(`/clients/${client._id}`)}>
                            <ClientCard client={client} />
                        </div>
                    ))}
                </div>

                {showModal && (
                    <AddClientModal 
                        onClose={() => setShowModal(false)}
                        onSuccess={handleNewClient}
                    />
                )}
            </div>
        </div>
    )
}

export default Client