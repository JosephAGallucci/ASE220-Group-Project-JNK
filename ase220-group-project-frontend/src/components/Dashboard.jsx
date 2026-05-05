import { useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import NoteGrid from "../components/NoteGrid.jsx";
import TagFilter from "../components/TagFilter.jsx";
import Header from "../components/Header.jsx";

/**
 * Dashboard component that displays a collection of notes.
 *
 * @component
 * @param {Object} props
 * @param {Array<{id: string, title: string, content: string, owner: string, tag: string}>} props.notes - List of notes to display.
 * @returns {JSX.Element}
 */
export default function Dashboard({ notes }) {
    const [filter, setFilter] = useState({ science: true, math: true, history: true, music: true, art: true, english: true, other: true });
    const [search, setSearch] = useState("");

    const renderedNotes = notes?.filter((note) => filter[note.tag] && note.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <Header />
            <SearchBar filterText={search} onFilterTextChange={setSearch} />
            <div style={{ display: 'flex' }}>
                <NoteGrid notes={renderedNotes} />
                <TagFilter filter={filter} setFilter={setFilter} />
            </div>
        </>
    )
}
