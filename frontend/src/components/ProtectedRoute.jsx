import React from 'react'
import {useAuth} from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({children}) => {

    const {accessToken} = useAuth();
    if(!accessToken){
        return <Navigate to='/login'/>
    }
  return children;
}

export default ProtectedRoute