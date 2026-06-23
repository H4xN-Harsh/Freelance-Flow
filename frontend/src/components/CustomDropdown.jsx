// components/CustomDropdown.jsx
import { useState } from 'react'

const CustomDropdown = ({ value, onChange, options, placeholder = "Select..." }) => {
    const [isOpen, setIsOpen] = useState(false)

    const selected = options.find(opt => opt.value === value)

    return (
        <div className="relative">
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between bg-white/[0.02] border border-white/10 text-text-primary text-sm rounded-xl px-4 py-3 outline-none hover:bg-white/[0.05] transition-all"
            >
                <span className={selected ? 'text-text-primary' : 'text-text-dim'}>
                    {selected ? selected.label : placeholder}
                </span>
                <svg
                    className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Options */}
            <div className={`absolute top-full left-0 right-0 mt-2 glass-panel rounded-xl p-1.5 z-10 transform origin-top transition-all duration-200 ease-out ${
                isOpen ? 'scale-y-100 opacity-100 translate-y-0' : 'scale-y-95 opacity-0 -translate-y-1 pointer-events-none'
            }`}>
                {options.map(opt => (
                    <button
                        key={opt.value}
                        type="button"
                        onClick={() => { onChange(opt.value); setIsOpen(false); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all hover:bg-white/5 ${
                            value === opt.value ? 'text-brand font-medium' : 'text-text-muted'
                        }`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CustomDropdown