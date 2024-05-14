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
    <button onClick={logOut} className='bg-gray-600 py-2 px-4 rounded-lg'>LogOutBtn</button>
  )
}

export default LogOutBtn