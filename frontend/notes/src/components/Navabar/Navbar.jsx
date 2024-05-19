import React from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate;
    const onLogout = () =>{
        navigate('/signin')
    }
    
  return (
    <div className='py-6 px-6'>
    <div className='bg-zinc-300 flex items-center justify-between px-6 py-2 drop-shadow rounded-xl backdrop-blur-sm		'>
            <h1 className='font-medium text-black text-2xl py-2'>Notes</h1>
            <ProfileInfo onLogout={}/>
    </div>
    </div>
  )
}

export default Navbar