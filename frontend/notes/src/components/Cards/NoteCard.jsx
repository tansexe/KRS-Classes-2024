import React from 'react'
import { MdOutlinePushPin } from 'react-icons/md'
import { MdCreate, MdDelete } from 'react-icons/md'
import axios from 'axios'

const NoteCard = ({ title, date, content, isPinned, noteId, onEdit, onDelete, onPinNote, fetchNotes }) => {
  const handlePinNote = async () => {
    try {
      const response = await axios.patch(
        `/notes/${noteId}`,
        { isPinned: !isPinned },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      onPinNote(noteId, response.data.isPinned)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteNote = async () => {
    try {
      await axios.delete(`http://localhost:5000/notes/${noteId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      onDelete(noteId)
      fetchNotes() // Fetch all notes after deleting
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="border rounded-xl p-4 bg-white/5 backdrop-blur-lg drop-shadow hover:shadow-xl transition-all ease-in-out">
      <div className="flex gap-4 items-center justify-between">
        <div>
          <h6 className="text-sm text-white font-bold text-xl font-medium">{title}</h6>
          <span className="text-s text-slate-100">{date}</span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? 'text-white' : 'text-slate-500'}`}
          onClick={handlePinNote}
        />
      </div>
      <p className="text-s text-slate-200 mt-2">{content?.slice(0, 60)}...</p>
      <div className="flex items-center justify-end mt-2">
        <div className="flex items-center gap-2">
          <MdCreate className="icon-btn hover:text-green-600" onClick={() => onEdit()} />
          <MdDelete className="icon-btn hover:text-red-600" onClick={handleDeleteNote} />
        </div>
      </div>
    </div>
  )
}

export default NoteCard