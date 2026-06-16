import React from 'react'
import Stairs from './components/animations/Stairs';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';

const App = () => {
  return (
    <>
    
      <NavBar/>
      <Routes>
        <Route path='/' element={<AuthPage/> }/>
      </Routes>
    </>
  )
}

export default App;