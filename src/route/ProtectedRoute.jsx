import React, { useContext } from 'react'
import { Auth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    let {user}=useContext(Auth)
    if(!user){
        return <Navigate to='/login' replace/>
    }else{
        return children;
    }
}

export default ProtectedRoute