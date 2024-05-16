import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from "../../store/authSlice"

const LogOutBtn = () => {
  
  const dispatch = useDispatch()

  const logOut = () => {
    authService.logout().then(()=>{
      dispatch(logout())
    })
  }

  return (
    <button onClick={logOut} className='bg-red-600 text-white py-2 px-4 rounded-lg'>Sign Out</button>
  )
}

export default LogOutBtn