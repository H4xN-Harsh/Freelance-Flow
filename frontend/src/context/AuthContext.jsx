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
    useEffect(()=>{
        const intercepter = API.interceptors.request.use((config)=>{
            if(accessToken)config.headers.Authorization = `Bearer ${accessToken}`;
            return config
        })
        return ()=>API.interceptors.request.eject(intercepter)
    },[accessToken])
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
    async function logout(){
        try{
            const res = await API.post('/auth/logout',{},{withCredentials:true});
            setUser(null);
            setAccessToken(null);
            navigate('/');
        }catch (err) {
            console.error(err);
        }
    }
    return (
        <AuthContext.Provider value={{user,accessToken,login, logout,loading}}>{children}</AuthContext.Provider>
    )
}

export const useAuth = ()=>useContext(AuthContext);