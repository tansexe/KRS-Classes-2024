import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate();
  
  const onLogout = () => {
    navigate('/signin')
  }

  const handleSearch = () => {
    // Implement search functionality
  }

  const onClearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className='py-6 px-[6%]'>
      <div className='flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-lg drop-shadow rounded-xl'>
        <Link to='/' >
        <h1  className='font-bold text-white text-3xl py-2'>Notes</h1>
        </Link>
        {/* <SearchBar 
          value={searchQuery} 
          onChange={({ target }) => {
            setSearchQuery(target.value)
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        /> */}
        <ProfileInfo onLogout={onLogout}/>
      </div>
    </div>
  )
}

export default Navbar
