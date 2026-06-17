import React, { useState } from 'react';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom'; // Fixed: Need useNavigate hook to execute redirecting

const AuthPage = () => {
  const [authMode, setAuthMode] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [identifier, setIdentifier] = useState(''); // Corrected spelling typo
  const { login } = useAuth();
  const navigate = useNavigate(); // Corrected: Hook instantiated properly

  const handleSub = async (e) => {
    e.preventDefault(); // Moved up: Always prevent default at the very start of submit tracking
    
    if (authMode === "login") {
      try {
        // Send identifier (which can be email or username depending on your backend)
        const res = await API.post('/auth/login', { identifier, password });
        const { accessToken, user } = res.data;
        login(user, accessToken);
        navigate('/dashboard'); // Fixed: Execute using the hook variable instance
      } catch (err) {
        console.log(err.response?.data?.message || err.message);
      }
    } else {
      try {
        const res = await API.post('/api/auth/register', { username, email, password });
        const { accessToken, user } = res.data;
        Login(user, accessToken);
        navigate('/dashboard');
      } catch (err) {
        console.log(err.response?.data?.message || err.message);
      }
    }
  };

  return (
    <div className='relative min-h-screen bg-bg-surface flex items-center justify-center p-4 overflow-hidden'>
      {/* BG-Glows */}
      <div className='absolute top-1/3 left-1/4 w-80 h-80 bg-brand/20 rounded-full blur-[130px] pointer-events-none' />
      <div className='absolute bottom-1/3 right-1/4 w-72 h-72 bg-brand-glow/15 rounded-full blur-[110px] pointer-events-none' />
      
      {/* Card container */}
      <div className='glass-panel w-full max-w-md p-6 tablet:p-10 rounded-2xl relative z-10 transition-all duration-500 ease-in-out'>
        
        {/* Header Tabs */}
        <div className='flex justify-center gap-6 mb-8 border-b border-white/5 pb-4'>
          <button type='button' onClick={() => setAuthMode('login')} className={`text-sm font-medium tracking-wide transition-all relative pb-4 ${
            authMode === 'login' ? 'text-text-primary' : 'text-text-dim hover:text-text-muted'
          }`}>
            Sign In 
            {authMode === 'login' && (
              <span className='absolute bottom-0 left-0 w-full h-[2px] bg-brand rounded-full' />
            )}
          </button>
          <button type='button' onClick={() => setAuthMode('register')} className={`text-sm font-medium tracking-wide transition-all relative pb-4 ${
            authMode === 'register' ? 'text-text-primary' : 'text-text-dim hover:text-text-muted'
          }`}>
            Create Account
            {authMode === 'register' && (
              <span className='absolute bottom-0 left-0 w-full h-[2px] bg-brand rounded-full' />
            )}
          </button>
        </div>

        {/* Dynamic Typography Section */}
        <div className='mb-6 text-center tablet:text-left'>
          <h2 className='text-2xl font-semibold tracking-tight text-text-primary'>
            {authMode === "login" ? "Welcome Back!" : "Get Started"}
          </h2>
          <p className='text-text-muted text-xs mt-1'>
            {authMode === 'login' ?
              'Enter your credentials to access your secure environment.' :
              'Fill in the details below to deploy your digital workspace.'
            }
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSub} className='space-y-5'>
          
          {/* FIELD 1: Username (Only visible during registration mode) */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            authMode === 'register' ? 'max-h-24 opacity-100 mb-2' : 'max-h-0 opacity-0 pointer-events-none'
          }`}>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
              Username
            </label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={authMode === 'register'}
              placeholder="alex_nexus" 
              className="w-full glass-interactive bg-white/[0.02] text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-brand/50 focus:bg-white/[0.04] transition-all placeholder:text-text-dim"
            />
          </div>

          {/* FIELD 2: Identifier/Email (Visible ONLY during login mode) */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            authMode === 'login' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
              Email or Username
            </label>
            <input 
              type="text" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required={authMode === 'login'}
              placeholder="name@company.com" 
              className="w-full glass-interactive bg-white/[0.02] text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-brand/50 focus:bg-white/[0.04] transition-all placeholder:text-text-dim"
            />
          </div>

          {/* FIELD 3: Clean Email Input (Visible ONLY during registration mode) */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            authMode === 'register' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}>
            <label className='block text-xs font-mono uppercase tracking-wider text-text-muted mb-2'>
              Email Address
            </label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required={authMode === 'register'} 
              placeholder='nivi@email.com' 
              className='w-full glass-interactive bg-white/[0.02] text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-brand/50 focus:bg-white/[0.04] transition-all placeholder:text-text-dim'
            />
          </div>

          {/* FIELD 4: Password Container (Always Visible) */}
          <div>
            <div className='flex justify-between items-center mb-2'>
              <label className='text-xs font-mono uppercase tracking-wider text-text-muted'>
                Password
              </label>
              {authMode === 'login' && (
                <a href="#" className='text-xs text-brand hover:underline transition-all'>Forgot?</a>
              )}
            </div>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder='••••••••' 
              className='w-full glass-interactive bg-white/[0.02] text-text-primary text-sm rounded-xl px-4 py-3 outline-none focus:border-brand/50 focus:bg-white/[0.04] transition-all placeholder:text-text-dim'
            />
          </div>

          {/* Action Submit Button */}
          <button 
            type='submit' 
            className='w-full mt-4 bg-brand hover:bg-brand/90 text-white text-sm font-medium py-3 rounded-xl shadow-lg shadow-brand/20 transition-all active:scale-95'
          >
            {authMode === "login" ? 'Sign In' : 'Register Account'}
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default AuthPage;