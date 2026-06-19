import React from 'react'
import Stairs from './components/animations/Stairs';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Client from './pages/Client';
import Task from './pages/Task';

const App = () => {
  return (
    <>
    
      <NavBar/>
      <Routes>
        <Route path='/' element={<AuthPage/> }/>
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path='/clients' element={<ProtectedRoute><Client/></ProtectedRoute>}/>
        <Route path='/tasks' element={<ProtectedRoute><Task/></ProtectedRoute>}/>
        
      </Routes>
    </>
  )
}

export default App;