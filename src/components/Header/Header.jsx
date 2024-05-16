import React, { useState } from 'react'
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

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
  <>
    <nav className='bg-white sticky top-0 mb-6 z-0 font-semibold text-black border border-b shadow-md p-4 py-5 flex justify-between items-center sm:px-8'>
      <div className='text-2xl text-orange-500 px-2'>Blogger</div>
      <div className='sm:hidden text-xl cursor-pointer text-orange-500' onClick={toggleMenu}>Menu</div>
      <div className='hidden sm:block'>
      <ul className='flex gap-7 items-center'>
      {navItems.map((item) => 
      item.active ? (
        <li className='text-lg font-semibold' key={item.slug}>
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
        </div>
    </nav>
    {isOpen ? (<div className='bg-white sm:hidden transition delay-150 duration-300 ease-in-out h-[50vh] p-5 fixed top-[64px]  right-0 left-0 z-10 border border-blue-400'>
    <ul>
      {navItems.map((item) => 
      item.active ? (
        <li className='font-semibold shadow-md text-xl list-inside list-disc m-5 border-b mb-10' key={item.slug}>
        <button onClick={()=>{
          setIsOpen(false)
          navigate(item.slug)}}>{item.name}</button>
        </li>
      ) : null
    )}
      <li className='m-5'>
        {
          authStatus && 
          <LogOutBtn />
        }
      </li>
      </ul>

      {/* <ul>
        <li className=' font-semibold text-xl list-inside list-disc m-5 border-b '>first</li>
        <li className=' font-semibold text-xl list-inside list-disc m-5 border-b '>second</li>
        <li className=' font-semibold text-xl list-inside list-disc m-5 border-b '>Third</li>
        <li className=' font-semibold text-xl list-inside list-disc m-5 border-b '>Forth</li>
      </ul> */}
    </div>) : ""}
    </>
    // <nav className='bg-gray-500 font-semibold text-white p-4 py-5'>
    //   <div className='max-w-7xl mx-auto flex justify-between items-center'>
    //     <div>
    //       <Link to='/' className='text-white'>
    //         Logo
    //       </Link>
    //     </div>
    //     <div className='md:hidden'>
    //       <button
    //         onClick={toggleMenu}
    //         className='text-white border border-white px-3 py-1 rounded-md'
    //       >
    //         Menu
    //       </button>
    //     </div>
    //     <div className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
    //       <ul className='md:flex gap-7 items-center'>
    //         {navItems.map(
    //           (item) =>
    //             item.active && (
    //               <li key={item.slug}>
    //                 <Link
    //                   to={item.slug}
    //                   className='text-white hover:text-gray-200'
    //                 >
    //                   {item.name}
    //                 </Link>
    //               </li>
    //             )
    //         )}
    //       </ul>
    //       {authStatus && (
    //         <div className='md:ml-4'>
    //           <LogOutBtn />
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </nav>
  )
}

export default Header