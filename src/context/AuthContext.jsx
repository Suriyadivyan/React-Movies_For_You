import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export let Auth=createContext()
const AuthContext=({children})=>{
    let [user,setUser]=useState(()=>{
        return localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null
    })
    let login=(loginDetails)=>{
        setUser(loginDetails)
        localStorage.setItem('user',JSON.stringify(loginDetails))
    }
    let logout=()=>{
        setUser(null)
        localStorage.removeItem('user')
    }
    return(
        <Auth.Provider value={{login,user,logout}}>{children}</Auth.Provider>
    )
}
export default AuthContext