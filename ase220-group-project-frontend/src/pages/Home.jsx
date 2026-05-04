import { useEffect, useState } from "react";
import NoteGrid from "../components/NoteGrid.jsx";
import TagFilter from "../components/TagFilter.jsx";
import Header from "../components/Header.jsx";

export default function Home() {
  const [filter, setFilter] = useState({ science: true, math: true, history: true, music: true, art: true, english: true, other: true });
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setNotes([
      { id: '1', title: 'Pythagorean Theorem', tag: 'math', content: 'Triangles are sick bro'},
      { id: '2', title: 'Photosynthesis', tag: 'science', content: 'That\'s when you take photos of synths, right?'},
      { id: '3', title: 'World War 2', tag: 'history' },
      { id: '4', title: 'Music Theory Basics', tag: 'music', content: 'Intervals'},
      { id: '5', title: 'Color Theory', tag: 'art', content: 'Compliment the colors bro'},
      { id: '6', title: 'Shakespeare Sonnets', tag: 'english', content: 'My brother probably has this memorized but me? Naaaaa' },
      { id: '7', title: 'Miscellaneous Note', tag: 'other', content: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
    ]);
  }, []);

  const renderedNotes = notes.filter((note) => filter[note.tag]);

  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <NoteGrid notes={renderedNotes} />
        <TagFilter filter={filter} setFilter={setFilter} />
      </div>
    </>
  )
}
