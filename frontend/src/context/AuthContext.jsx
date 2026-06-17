import { createContext, useContext, useEffect, useState } from "react";
import API from '../utils/api.js'
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext();
export function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const [accessToken,setAccessToken] = useState(null);
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(()=>{
        async function refreshAccessToken() {
            try{
                const res = await API.post('/auth/refresh',{},{
                    withCredentials: true
                })
                setAccessToken(res.data.accessToken);
                setUser(res.data.user)
            }catch(err){
                setUser(null);
                setAccessToken(null);
            }finally{
                setLoading(false)
            }
        }
        refreshAccessToken();
    },[])
    
    async function login(user,accessToken){
        try{
            
            setUser(user);
            setAccessToken(accessToken);
            navigate('/dashboard');
        }catch(err){
            console.log(err)
            return{
                success:false,
                message:err.response?.data?.message,
            }
        }
    }
    async function Logout(){
        try{
            const res = await API.post('/auth/logout',{},{withCredentials:true});
            setUser(null);
            setAccessToken(null);
            navigate('/login');
        }catch (err) {
            console.error(err);
        }
    }
    return (
        <AuthContext.Provider value={{user,accessToken,login, Logout,loading}}>{children}</AuthContext.Provider>
    )
}

export const useAuth = ()=>useContext(AuthContext);