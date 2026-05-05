import MiniNote from "../components/MiniNote.jsx";

/**
  * @param {Object} param0 
  * @param {Array<Object>} param0.notes 
  */
export default function NoteGrid({ notes }) {
  if (!notes) return <div id="note-list">Loading...</div>
  if (notes.length === 0) return <div id="note-list">No notes</div>

  return (
    <div id="note-list">
      {notes.map((note) => <MiniNote key={note.id} note={note} />)}
    </div>
  )
}
