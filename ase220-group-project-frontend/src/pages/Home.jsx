import { useEffect, useState } from "react";
import NoteGrid from "../components/NoteGrid.jsx";
import TagFilter from "../components/TagFilter.jsx";

export default function Home() {
  const [filter, setFilter] = useState({ science: true, math: true, history: true, music: true, art: true, english: true, other: true });
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setNotes([
      { id: '1', title: 'Pythagorean Theorem', tag: 'math' },
      { id: '2', title: 'Photosynthesis', tag: 'science' },
      { id: '3', title: 'World War 2', tag: 'history' },
      { id: '4', title: 'Music Theory Basics', tag: 'music' },
      { id: '5', title: 'Color Theory', tag: 'art' },
      { id: '6', title: 'Shakespeare Sonnets', tag: 'english' },
      { id: '7', title: 'Miscellaneous Note', tag: 'other' },
    ]);
  }, []);

  const renderedNotes = notes.filter((note) => filter[note.tag]);

  return (
    <div style={{ display: 'flex' }}>
      < NoteGrid notes={renderedNotes} />
      <TagFilter filter={filter} setFilter={setFilter} />
    </div >
  )
}
