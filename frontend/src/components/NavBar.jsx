import React, { useState } from 'react'
import {useAuth} from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom';
const NavBar = () => {
  const {user,logout} = useAuth();
  const [isOpen,setIsOpen] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 w-full z-50 p-4 ">
      <div className='glass-panel max-w-6xl mx-auto px-6 py-4 rounded-2xl flex items-center justify-between transition-all duration-300'>
        <div>
          <h1 className='font-extrabold text-xl font-cantarell '>Freelance<span className='text-blue-500 font-extrabold text-xl'>Flow</span></h1>
        </div>
        <div>
          {!user?(
            <>
              <span className='bg-brand hover:bg-brand/90 text-white text-sm font-medium px-5 py-2 rounded-xl shadow-lg shadow-brand/20 transition-all active:scale-95'>Sign-up</span>
            </>
          ):(<>
          {/* this is for desktop */}

            <div className='hidden md:flex items-center space-x-6 lg:space-x-8'>
                <span>Logout</span>
                <span>DeleteAccount</span>
            </div>
          </>)}
        </div>
      </div>
    </div>
  )
}

export default NavBar