import MiniNote from "../components/MiniNote.jsx";

/**
  * @param {Object} param0 
  * @param {Array<Object>} param0.notes 
  */
export default function NoteGrid({ notes }) {
  return (
    <div id="note-list">
      {notes.map((note) =>
        <MiniNote key={note.id} noteText={note.title} noteTags={note.tag} />
      )}
    </div>
  )
}
