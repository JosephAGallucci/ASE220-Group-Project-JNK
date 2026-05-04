import LargeNote from "../components/LargeNote.jsx";
import Header from "../components/Header.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ViewNote()
{
    const {id} = useParams();
    const {note, setNote} = useState(null);

    useEffect(() => {
        fetch (`/API/notes/${id}`)
        .then ((response) => response.json())
        .then ((response) => {
            setNote(response);
        })
        .catch((error) => console.error(error));
    }
    );

    return (
        <>
        <Header />
        <LargeNote key={id} note={note}/> 
        </>
    );
}