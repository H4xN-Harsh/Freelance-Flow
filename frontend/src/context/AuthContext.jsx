import { createContext, useContext, useEffect, useState } from "react";
import API from '../utils/api.js'
import {useNavigate} from 'react-router-dom'
const AuthContext = createContext();
export function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const [accessToken,setAccessToken] = useState(null);
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
            }
        }
        refreshAccessToken();
    },[])
    
    async function login(user,accessToken){
        try{
            const res = await API.post(
                "/auth/login",{identifyer,password},{withCredentials:true}
            );
            setUser(res.data.user);
            setAccessToken(res.data.accessToken);
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
        <AuthContext.Provider value={{user,accessToken,login, Logout}}>{children}</AuthContext.Provider>
    )
}

export const useAuth = ()=>useContext(AuthContext);