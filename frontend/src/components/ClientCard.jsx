// components/ClientCard.jsx
import { useState } from 'react'

const ClientCard = ({ client }) => {
    const [isHovered, setIsHovered] = useState(false)

    // Calculations — projects ke andar se nikalo
    const totalProjects = client.project?.length || 0
    const completedProjects = client.project?.filter(p => p.status === 'completed').length || 0
    const activeProjects = client.project?.filter(p => p.status === 'active').length || 0
    const totalEarnings = client.project?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`mt-3 glass-panel rounded-2xl p-6 transition-all duration-300 ease-in-out cursor-pointer ${
                isHovered ? 'scale-[1.03] shadow-lg shadow-brand/10' : 'scale-100'
            }`}
        >
            {/* Always visible — basic info */}
            <h3 className="text-lg font-semibold text-text-primary">
                {client.clientName}
            </h3>
            <p className="text-text-muted text-sm mt-1">
                {client.clientEmail}
            </p>

            {/* Expand on hover — extra details */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isHovered ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}>
                <div className="border-t border-white/5 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-text-dim">Total Projects</span>
                        <span className="text-text-primary font-medium">{totalProjects}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-text-dim">Completed</span>
                        <span className="text-green-400 font-medium">{completedProjects}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-text-dim">Active</span>
                        <span className="text-brand font-medium">{activeProjects}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-text-dim">Total Value</span>
                        <span className="text-text-primary font-semibold">
                            ₹{totalEarnings.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientCard