import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navabar/Navbar'
import axios from 'axios'
import { MdOutlinePushPin, MdCreate, MdDelete, MdClose, MdAdd } from 'react-icons/md'

const Home = () => {
  const [noteData, setNoteData] = useState(null)
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState(null)
  const [showAddEditModal, setShowAddEditModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [viewMode, setViewMode] = useState(false)

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      const response = await axios.get('krs-classes-2024-api.vercel.app/notes', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      setNotes(response.data.notes.reverse()) // Reverse the order of notes
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteNote = async (noteId) => {
    if (!noteId) {
      console.error('Unable to delete note: noteId is undefined')
      return
    }

    try {
      await axios.delete(`krs-classes-2024-api.vercel.app/${noteId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      fetchNotes() // Fetch updated notes after deleting
    } catch (error) {
      console.error(error)
    }
  }

  const handlePinNote = async (noteId, isPinned) => {
    try {
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === noteId ? { ...note, isPinned } : note))
      )
    } catch (error) {
      console.error(error)
    }
  }

  const addNewNote = async () => {
    try {
      await axios.post('krs-classes-2024-api.vercel.app/notes', {
        title,
        content
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      fetchNotes()
      resetForm()
    } catch (error) {
      console.error(error)
      setError('Failed to add note')
    }
  }

  const editNote = async () => {
    try {
      await axios.patch(`krs-classes-2024-api.vercel.app/notes/${noteData._id}`, {
        title,
        content
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      fetchNotes()
      resetForm()
    } catch (error) {
      console.error(error)
      setError('Failed to edit note')
    }
  }

  const handleAddEditNote = () => {
    if (!title) {
      setError("Please enter the title")
      return
    }
    if (!content) {
      setError("Please add some content")
      return
    }
    setError("")

    if (editMode) {
      editNote()
    } else {
      addNewNote()
    }
  }

  const resetForm = () => {
    setTitle('')
    setContent('')
    setError(null)
    setShowAddEditModal(false)
    setEditMode(false)
    setViewMode(false)
  }

  const openAddEditModal = (note = null) => {
    if (note) {
      setEditMode(true)
      setNoteData(note)
      setTitle(note.title)
      setContent(note.content)
    } else {
      setEditMode(false)
      setNoteData(null)
    }
    setViewMode(false)
    setShowAddEditModal(true)
  }

  const viewNote = (note) => {
    setNoteData(note)
    setTitle(note.title)
    setContent(note.content)
    setEditMode(false)
    setViewMode(true)
    setShowAddEditModal(true)
  }

  return (
    <>
      <div className="relative w-full h-full">
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(https://img.freepik.com/free-photo/light-darkness_181624-10465.jpg?w=1060&t=st=1716537627~exp=1716538227~hmac=a4919fcc78b5d3680b8fabd965c4eaf8bb80c0d64d8b2a0f82975180deb88de0)'
          }}
        ></div>
        <div className="fixed inset-0 bg-black opacity-65"></div>
        <div className="relative z-10">
          <Navbar />
          <div className="container mx-auto mt-8 flex flex-col">
            <h1 className="text-white text-2xl py-5 px-2">All Notes</h1>
            <div className="">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {notes && notes.length > 0 ? (
                  notes.map((note) => (
                    <div
                      key={note._id}
                      className="border rounded-xl p-4 bg-white/5 backdrop-blur-lg drop-shadow hover:shadow-xl transition-all ease-in-out cursor-pointer"
                      onClick={() => viewNote(note)}
                    >
                      <div className="flex gap-4 items-center justify-between">
                        <div>
                          <h6 className="text-sm text-white font-bold text-xl font-medium">{note.title}</h6>
                          <span className="text-s text-slate-100">
                            {new Date(note.createdAt).toLocaleDateString()} {new Date(note.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <MdOutlinePushPin
                          className={`icon-btn ${note.isPinned ? 'text-white' : 'text-slate-500'}`}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event propagation to prevent opening the note content
                            handlePinNote(note._id, !note.isPinned);
                          }}
                        />
                      </div>
                      <p className="text-s text-slate-200 mt-2">{note.content.slice(0, 60)}...</p>
                      <div className="flex items-center justify-end mt-2">
                        <div className="flex items-center gap-2">
                          <MdCreate
                            className="icon-btn hover:text-green-600"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent event propagation to prevent opening the note content
                              openAddEditModal(note);
                            }}
                          />
                          <MdDelete
                            className="icon-btn hover:text-red-600"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent event propagation to prevent opening the note content
                              handleDeleteNote(note._id);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white">No notes found.</p>
                )}
              </div>
            </div>
            </div>
        </div>
      </div>

      {/* Add Note button */}
      <button
        className="fixed bottom-8 right-8 bg-white/10 backdrop-blur-lg drop-shadow hover:shadow-xl transition-all ease-in-out text-white rounded-md p-4"
        onClick={() => openAddEditModal()}
      >
        <MdAdd className="text-2xl" />
      </button>

      {showAddEditModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => resetForm()}
          ></div>
          <div className="relative bg-white/5 backdrop-blur-lg drop-shadow rounded-lg hover:bg-white/5 transition-all ease-in-out w-[700px] md:w-[400] px-10 py-5">
            <button
              className="w-6 h-6 rounded-full flex items-center justify-center absolute top-3 right-3 hover:bg-slate-500"
              onClick={resetForm}
            >
              <MdClose className="text-xl text-white" />
            </button>
            <div className="flex flex-col gap-2">
              <label className="input-label">TITLE</label>
              <input
                type="text"
                className="text-2xl text-white rounded-md p-1 bg-white/10 backdrop-blur-lg drop-shadow hover:bg-white/5 transition-all ease-in-out outline-none placeholder:text-white pl-4"
                placeholder="Enter title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                disabled={viewMode}
              />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <label className="input-label">CONTENT</label>
              <textarea
                type="text"
                className="text-sm text-white outline-none p-2 bg-white/10 backdrop-blur-lg drop-shadow hover:bg-white/5 transition-all ease-in-out outline-none placeholder:text-white pl-4 rounded"
                placeholder="Enter content"
                value={content}
                onChange={({ target }) => setContent(target.value)}
                rows={20}
                disabled={viewMode}
              />
            </div>
            {error && <p className="text-red-500 tet-xs pt-4">{error}</p>}
            {!viewMode && (
              <button
                className="btn-primary font-medium mt-5 p-3"
                onClick={handleAddEditNote}
              >
                {editMode ? 'UPDATE' : 'ADD'}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Home