import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate();
    const onLogout = () =>{
        navigate('/signin')
    }
      const handleSearch = () =>{

      }
      const onClearSearch = () =>{
        setSearchQuery("")
      }
  return (
    <div className='py-6 px-[6%]'>
    <div className='bg-zinc-300 flex items-center justify-between px-6 py-2 drop-shadow rounded-xl backdrop-blur-sm		'>
            <h1 className='font-medium text-black text-2xl py-2'>Notes</h1>
            <SearchBar 
            value={searchQuery} 
            onChange={({target}) =>{
              setSearchQuery(target.value)
            }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
            />
            <ProfileInfo onLogout={onLogout}/>
    </div>
    </div>
  )
}

export default Navbar