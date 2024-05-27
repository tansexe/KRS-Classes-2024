import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import axios from 'axios'

const AddEditNotes = ({ noteData, type, onClose, onSubmit }) => {
    const [title, setTitle] = useState(noteData?.title || '')
    const [content, setContent] = useState(noteData?.content || '')
    const [error, setError] = useState(null)

    const addNewNote = async () => {
        try {
            await axios.post('http://localhost:5000/notes', {
                title,
                content
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            onSubmit()
            resetForm()
        } catch (error) {
            console.error(error)
            setError('Failed to add note')
        }
    }

    const editNote = async () => {
        try {
            await axios.patch(`/notes/${noteData._id}`, {
                title,
                content
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            onSubmit()
            resetForm()
        } catch (error) {
            console.error(error)
            setError('Failed to edit note')
        }
    }

    const handleAddNote = () => {
        if (!title) {
            setError("Please enter the title")
            return
        }
        if (!content) {
            setError("Please add some content")
            return
        }
        setError("")

        if (type === 'edit') {
            editNote()
        } else {
            addNewNote()
        }
    }

    const resetForm = () => {
        setTitle('')
        setContent('')
        setError(null)
        onClose()
    }

    return (
        <div className='w-full flex justify-center items-center '>
            <div className='relative bg-white/5 backdrop-blur-lg drop-shadow rounded-lg hover:bg-white/5 transition-all ease-in-out w-[700px] md:w-[400] px-10 py-5 '>
                <button className='w-6 h-6 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500' onClick={onClose}>
                    <MdClose className='text-xl text-white' />
                </button>
                <div className='flex flex-col gap-2'>
                    <label className='input-label'>TITLE</label>
                    <input
                        type='text'
                        className='text-2xl text-white rounded-md p-1 bg-white/10 backdrop-blur-lg drop-shadow hover:bg-white/5 transition-all ease-in-out outline-none placeholder:text-white pl-4'
                        placeholder='Enter title'
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div className='flex flex-col gap-2 mt-4'>
                    <label className='input-label'>CONTENT</label>
                    <textarea
                        type="text"
                        className='text-sm text-white outline-none p-2  bg-white/10 backdrop-blur-lg drop-shadow hover:bg-white/5 transition-all ease-in-out outline-none placeholder:text-white pl-4 rounded'
                        placeholder='Enter content'
                        value={content}
                        onChange={({ target }) => setContent(target.value)}
                        rows={2} />
                </div>
                {error && <p className='text-red-500 tet-xs pt-4'>{error}</p>}
                <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>
                    {type === 'edit' ? 'UPDATE' : 'ADD'}
                </button>
            </div>
        </div>
    )
}

export default AddEditNotes