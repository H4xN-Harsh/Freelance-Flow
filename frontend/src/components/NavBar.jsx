import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Clients', path: '/clients' },
  { name: 'Tasks', path: '/tasks' },
  { name: 'Invoices', path: '/invoices' },
];

const NavBar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 w-full z-50 p-4">
      <div className='glass-panel max-w-6xl mx-auto px-6 py-4 rounded-2xl flex items-center justify-between transition-all duration-300'>
        
        {/* Logo */}
        <div onClick={() => navigate(user ? '/dashboard' : '/auth')} className="cursor-pointer select-none">
          <h1 className='font-extrabold text-xl tracking-tight'>
            Freelance<span className='text-brand font-extrabold text-xl'>Flow</span>
          </h1>
        </div>

        {/* Sirf user logged in hai tab ye sab dikhega */}
        {user && (
          <>
            {/* DESKTOP MENU */}
            <div className='hidden md:flex items-center space-x-8'>
              {navLinks.map(link => {
                const isActive = location.pathname === link.path;
                return (
                  <button 
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className={`text-sm font-medium tracking-wide transition-all relative pb-1 ${
                      isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className='absolute bottom-0 left-0 w-full h-[2px] bg-brand rounded-full' />
                    )}
                  </button>
                );
              })}

              <span 
                onClick={logout}
                className='cursor-pointer text-text-muted hover:text-red-400 transition-all text-sm font-medium'
              >
                Logout
              </span>
            </div>

            {/* MOBILE HAMBURGER BUTTON */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 rounded-lg glass-interactive focus:outline-none"
            >
              <span className={`h-0.5 w-5 bg-text-primary rounded-full transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 w-5 bg-text-primary rounded-full transition-opacity duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`h-0.5 w-5 bg-text-primary rounded-full transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

            {/* MOBILE DROPDOWN DRAWER */}
            <div className={`md:hidden fixed inset-x-4 top-24 rounded-2xl glass-panel p-6 transform origin-top transition-all duration-300 ease-out ${
              isOpen ? 'scale-y-100 opacity-100 translate-y-0' : 'scale-y-95 opacity-0 -translate-y-4 pointer-events-none'
            }`}>
              <div className="flex flex-col space-y-4 text-center">
                {navLinks.map(link => {
                  const isActive = location.pathname === link.path;
                  return (
                    <button 
                      key={link.path}
                      onClick={() => { navigate(link.path); setIsOpen(false); }}
                      className={`text-sm font-medium py-2 ${isActive ? 'text-brand' : 'text-text-primary'}`}
                    >
                      {link.name}
                    </button>
                  );
                })}

                <button 
                  onClick={() => { logout(); setIsOpen(false); }}
                  className='text-sm font-medium text-red-400 py-2 border-t border-white/5 pt-4'
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default NavBar;