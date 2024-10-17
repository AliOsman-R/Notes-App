import { useState } from "react"
import Note from "./Note";
import { NotesProps } from "./types";

const Notes = ({ notes, filteredNotes, setNotes}: NotesProps) => {
    const [noteText, setnoteText] = useState("")
    const remaining = 200 - noteText.length 
    
    const handleSave = () => {
      const newNote = {
          date: new Date().toLocaleDateString(),
          noteText,
          id: crypto.randomUUID(),
          isUpdate: false,
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes)
      setnoteText("")
      localStorage.setItem("notesLs", JSON.stringify(updatedNotes))
    }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col justify-between bg-[#8afcfe] h-[250px] w-full p-5 overflow-hidden">
        <textarea 
          onChange={(e) => setnoteText(e.target.value)}
          maxLength={200}
          value={noteText} 
          className='bg-transparent outline-none overflow-hidden h-[80%] resize-none placeholder:text-gray-500' 
          placeholder='Type to add a note...'
        />
        <div className="flex justify-between">
          <p>{remaining} Remaining</p>
          <button 
            disabled={!noteText} 
            onClick={handleSave}
            className='bg-gray-200 rounded-full px-5 py-1 font-semibold hover:bg-gray-300 disabled:bg-slate-200 disabled:text-black '
          >
              Save
          </button>
        </div>
      </div>
        {filteredNotes.map((note) => (
            <Note 
              key={note.id} 
              note={note} 
              notes={notes} 
              setNotes={setNotes} 
            />
        ))}
    </div>
  )
}

export default Notes