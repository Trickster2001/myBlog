import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import LogOutBtn from './LogOutBtn'

const Header = () => {

  const authStatus = useSelector((state) => state.auth.status);
  console.log(authStatus)

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "All Posts",
      slug: "/allPosts",
      active: authStatus
    },
    {
      name: "Add Post",
      slug: "/addpost",
      active: authStatus
    }
  ]

  const navigate = useNavigate();

  return (
    <nav className='bg-gray-500 font-semibold text-white p-4 py-5 flex justify-between items-center'>
      <div>Logo</div>
      <ul className='flex gap-7 items-center'>
      {navItems.map((item) => 
      item.active ? (
        <li key={item.slug}>
        <button onClick={()=>navigate(item.slug)}>{item.name}</button>
        </li>
      ) : null
      )}
      <li>
        {
          authStatus && 
        <LogOutBtn />
        }
      </li>
      </ul>
    </nav>
  )
}

export default Header