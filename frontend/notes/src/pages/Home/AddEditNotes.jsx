import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'

const AddEditNotes = ({ noteData, type, onClose}) => {
    const [title , setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);

    const handleAddNote = () => {
        if ( !title){
            setError("please Enter the Title")
            return
        }
        if(!content){
            setError("please add some content")
            return
        }
        setError("")
    }
  return (
    <div className='relative'>
        <button className='w-6 h-6 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500' onClick={onClose}>
            <MdClose className='text-xl text-slate-400' />
        </button>
        <div className='flex flex-col gap-2'>
            <label className='input-label'>TITLE</label>
            <input
                type='text'
                className='text-2xl text-slate-950 outline-none'
                placeholder='Enter title'
                value={title}
                onChange={({target}) => setTitle(target.value)}
            />

        </div>
        <div className='flex flex-col gap-2 mt-4'>
            <label className='input-label'>CONTENT</label>
            <textarea
                type="text"
                className='text-sm text-slate-950 outline-none p-2 bg-gray-100 rounded'
                placeholder='Enter content' 
                value={content}
                onChange={({target}) => setContent(target.value)}
                rows={10}/>
                

        </div>
        {error && <p className='text-red-500 tet-xs pt-4'>{error}</p>}
        <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>
            ADD
        </button>
    </div>
  )
}

export default AddEditNotes