import React from 'react'
import Navbar from './Navbar'


const Home = () => {
  return (
    <div className='h-screen w-full '>
      <Navbar></Navbar>
      <div className='h-full w-full'>
        <h1 className='text-7xl font-bold text-black absolute top-40'>Welcome to lauda institute</h1>
      </div>
    </div>
  )
}

export default Home
