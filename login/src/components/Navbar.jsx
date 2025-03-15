import React from 'react'
import { Link, NavLink } from 'react-router'
const Navbar = () => {
  return (
    <div className='fixed top-0 w-full bg-gray-200 p-2 min-h-20 flex justify-end items-center gap-4'>
       

      <NavLink to='/login' className="px-6 py-4 bg-green-400 text-white rounded-md">Login</NavLink>
      <NavLink to ="/signup" className="px-6 py-4 bg-blue-400 text-white rounded-md">Signup</NavLink>
        
    </div>
  )
}

export default Navbar
