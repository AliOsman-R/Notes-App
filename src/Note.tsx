import  { useState } from 'react'
import { GrUpdate } from 'react-icons/gr'
import { BiTrash } from 'react-icons/bi'
import { NoteProps, NoteType } from './types'

const Note = ({ note, notes, setNotes}: NoteProps) => {
    const [noteText, setnoteText] = useState(note.noteText || "")
    const [isUpdate, setIsUpdate] = useState(note.isUpdate)
    const remaining = 200 - noteText.length 
    const bgColor = isUpdate? "bg-[#15d3aa]" : "bg-[#fef68a]"

    const updateNotes = (newNotes: NoteType[]) => {
      setNotes(newNotes);
      localStorage.setItem('notesLs', JSON.stringify(newNotes));
    };

    const handleIsUpdate = () => {
      const newNotes = notes.map(n => n.id === note.id? {...n, isUpdate:true} : n)
      updateNotes(newNotes)
      setIsUpdate(true)
    }


    const handleUpdate = () => {
      const date = new Date().toLocaleDateString()
      const newNotes = notes.map(n => n.id === note.id? {...n, isUpdate:false, noteText, date} : n)
      updateNotes(newNotes)
      setIsUpdate(false)
    }


    const handleDelete = () => {
        const newNotes = notes.filter(n => n.id != note.id)
        updateNotes(newNotes)
    }
    
  return (
    <div className={`flex flex-col justify-between ${bgColor} h-[250px] w-full p-5 overflow-hidden`}>
      <textarea 
        onChange={(e) => setnoteText(e.target.value)}
        maxLength={200}
        value={noteText} 
        readOnly={!isUpdate}
        className='bg-transparent outline-none cursor-auto overflow-hidden h-[80%] resize-none placeholder:text-gray-500' 
        placeholder='Type to add a note...'
      />
      <div className="flex justify-between">
        <p>{!isUpdate? note?.date : `${remaining} Remaining`}</p>
         {isUpdate ? (
          <button 
            disabled={!noteText} 
            onClick={handleUpdate} 
            className="bg-gray-200 rounded-full px-3 py-1 font-semibold hover:bg-gray-300 disabled:bg-slate-200 disabled:text-black"
          >
            Update
          </button>
        ) : (
          <div className="flex gap-3">
            <GrUpdate onClick={handleIsUpdate} className="cursor-pointer" />
            <BiTrash onClick={handleDelete} className="cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Note