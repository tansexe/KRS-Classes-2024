import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io"

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className='w-80 flex items-center px-4 bg-white/10 backdrop-blur-lg drop-shadow rounded-md'>
      <input 
        type='text'
        placeholder='Search Notes'
        className='w-full text-xs text-white bg-transparent py-[11px] outline-none py-4 placeholder-white'
        value={value}
        onChange={onChange}
      />
      {value && (
        <IoMdClose 
          className='text-xl text-white cursor-pointer hover:text-gray-300 mr-3' 
          onClick={onClearSearch} 
        />
      )}
      <FaMagnifyingGlass 
        className='text-white cursor-pointer hover:text-gray-300' 
        onClick={handleSearch} 
      />
    </div>
  )
}

export default SearchBar
