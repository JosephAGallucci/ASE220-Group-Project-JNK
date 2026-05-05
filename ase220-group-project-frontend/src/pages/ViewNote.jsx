import LargeNote from "../components/LargeNote.jsx";
import Header from "../components/Header.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToken } from "../context/AuthContext.jsx";
import EditNote from "../components/EditNote.jsx";

export default function ViewNote() {
    const { id } = useParams();
    const [editMode, setRawEditMode] = useState(false);
    const setEditMode = (value) => { setRawEditMode(value); setError(null) };
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

    const editNote = (title, content, tag) => {
        fetch(`/API/notes/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, content, tag }),
        }).then(res => {
            if (res.ok) {
                setNote({ ...note, title, content, tag });
                setEditMode(false);
            } else {
                res.json()
                    .then(e => setError(e.error))
                    .catch(() => setError(`Got code ${res.status}`));
            }
        }).catch((error) => {
            console.error(error);
            setError("Failed to fetch");
        });
    };

    useEffect(() => {
        fetch(`/API/notes/${id}`)
            .then((response) => response.json())
            .then((response) => {
                if (response.id) setNote(response);
                else setError(response.error);
            })
            .catch((error) => {
                console.error(error);
                setError("Failed to fetch");
            });
    }, []);

    let render;
    if (note) {
        const options = <div className="view-options">
            <button onClick={() => setEditMode(true)}>Edit</button>
            <button onClick={deleteNote}>Delete</button>
        </div>;

        render = editMode ?
            <>
                {error && <div className="error">{error}</div>}
                <EditNote note={note} onSubmit={editNote} actionLabel="Edit Note" />
                <button onClick={() => setEditMode(false)} style={{ alignSelf: 'center' }}>Cancel</button>
            </>
            :
            <div className="create-form">
                <LargeNote key={id} note={note} />
                {owner === note.owner && options}
            </div>;
    } else {
        render = <p style={{ margin: "auto", marginTop: '24px' }}>{error ?? "Loading..."}</p>;
    }

    return (
        <>
            <Header />
            {render}
        </>
    );
}
