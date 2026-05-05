import { useEffect, useState } from "react";
import NoteGrid from "../components/NoteGrid.jsx";
import TagFilter from "../components/TagFilter.jsx";
import Header from "../components/Header.jsx";

export default function Home() {
  const [filter, setFilter] = useState({ science: true, math: true, history: true, music: true, art: true, english: true, other: true });
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    fetch('/API/notes').then(res => res.json()).then((setNotes));
  }, []);

  const renderedNotes = notes?.filter((note) => filter[note.tag]);

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
