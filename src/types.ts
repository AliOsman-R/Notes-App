export type NoteType = {
    date:string;
    noteText:string;
    id:string;
    isUpdate:boolean
  }

export type NotesProps = {
    notes:NoteType[]
    filteredNotes:NoteType[]
    setNotes:React.Dispatch<React.SetStateAction<NoteType[]>>
}

export type NoteProps = {note:NoteType} & Omit<NotesProps, "filteredNotes">