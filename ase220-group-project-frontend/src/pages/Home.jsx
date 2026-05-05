import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard.jsx";
import SearchBar from "../components/SearchBar.jsx";

export default function Home() {
  const [notes, setNotes] = useState(null);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetch('/API/notes').then(res => res.json()).then((setNotes));
  }, []);


  return (
    <>
    <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
    <Dashboard notes={notes} />
    </>
  )
}
