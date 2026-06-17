import React from 'react'
import {useAuth} from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({children}) => {

    const {accessToken,loading} = useAuth();
    if(loading)return <div>Loading....</div>
    if(!accessToken){
        return <Navigate to='/login'/>
    }
  return children;
}

export default ProtectedRoute