import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import {Header, Footer, PostCard} from "./components"
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import service from "./appwrite/config";
import { login, logout } from './store/authSlice';
const App = () => {
  const [loading, setLoading] = useState(true);
  // const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}));
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false));

  },[])
  
  return !loading ?
    <div>
      <Header />
      <Outlet />
    </div>
  : null
}

export default App