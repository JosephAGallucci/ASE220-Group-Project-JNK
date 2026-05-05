import LargeNote from "../components/LargeNote.jsx";
import Header from "../components/Header.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToken } from "../context/AuthContext.jsx";

export default function ViewNote() {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [error, setError] = useState(null);
    const { token } = useToken();
    const navigate = useNavigate();

    const owner = token ? JSON.parse(atob(token.split('.')[1])).sub : null;

    const deleteNote = () => {
        fetch(`/API/notes/${id}`, {
            method: 'DELETE',
            headers: { authorization: `Bearer ${token}` }
        })
            .then((response) => {
                if (response.ok) {
                    navigate('/dashboard');
                }
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        fetch(`/API/notes/${id}`)
            .then((response) => response.json())
            .then((response) => {
                if (response.id) setNote(response);
                else setError(response.error);
            })
            .catch((error) => console.error(error));
    }, []);

    const message = <p style={{ margin: "auto", marginTop: '24px' }}>{error ?? "Loading..."}</p>;

    return (
        <>
            <Header />
            {note ?
                <div className="create-form">
                    <LargeNote key={id} note={note} />
                    {owner === note.owner && <button onClick={deleteNote} className="deletebutton">Delete</button>}
                </div>
                : message
            }
        </>
    );
}
