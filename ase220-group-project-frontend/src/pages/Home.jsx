import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard.jsx";

export default function Home() {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    fetch('/API/notes').then(res => res.json()).then((setNotes));
  }, []);


  return (
    <Dashboard notes={notes} />
  )
}
