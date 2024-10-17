import { BiSearch } from 'react-icons/bi'
import Notes from './Notes'
import { useEffect, useState } from 'react';
import { NoteType } from './types';

const App = () => {
  const [notes, setNotes] = useState<NoteType[]>([])
  const [filteredNotes, setFilteredNotes] = useState<NoteType[]>([])
  const [appearance, setAppearance] = useState<"Light" | "Dark">("Light")
  const [search, setSearch] = useState("")

  const IsLight = appearance === "Light"
  const appearanceBg = IsLight? "bg-gray-100" : "bg-black"
  const appearanceMode = IsLight? "Dark" : "Light"
  const notesColor = IsLight? "text-black" : "text-white"
  const appearanceStyle = IsLight? "hover:bg-black hover:text-white" : "hover:bg-white hover:text-black"

  useEffect(() => {
    const storedNotes = localStorage.getItem('notesLs');
    if (storedNotes) {
      const parsedNotes = JSON.parse(storedNotes);
      setNotes(parsedNotes);
      setFilteredNotes(parsedNotes);
    }
  }, [])

  useEffect(() => {
    const filtered = notes.filter((note) =>
      note.noteText.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [search, notes]);

  return (
    <div className={` ${appearanceBg} w-screen min-h-screen pt-10`}>
      <div className="flex flex-col justify-center gap-10 mx-auto w-[70%]">
        <div className="flex justify-between"> 
          <p className={`text-3xl font-bold ${notesColor}`}>Notes</p>
          <p 
            onClick={() => setAppearance(appearanceMode)} 
            className={`font-bold px-3 py-2 rounded-full bg-[#8afcfe] ${appearanceStyle} cursor-pointer`}
          >
            {appearanceMode} Mode
          </p>
        </div>
        <div className="bg-gray-200 w-full flex items-center gap-2 rounded-lg p-1">
          <BiSearch size={22}/>
          <input 
            type="text" 
            onChange={(e) => setSearch(e.target.value)} 
            className='bg-transparent outline-none border-none text-xl w-full' 
            placeholder='Search...' 
          />
        </div>
        <Notes 
          setNotes={setNotes} 
          filteredNotes={filteredNotes} 
          notes={notes}
        />
      </div>
    </div>
  )
}

export default App