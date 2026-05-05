import Header from "../components/Header.jsx";
import EditNote from "../components/EditNote.jsx";
import { useNavigate } from "react-router-dom";
import { useToken } from "../context/AuthContext.jsx";
import { useState } from "react";

export default function CreateNote() {
  const [error, setError] = useState();
  const { token } = useToken();
  const navigate = useNavigate();

  if (!token) {
    navigate('/login');
  }

  const createNote = (title, content, tag) => {
    fetch('/API/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: title,
        content: content,
        tag: tag
      })
    }).then(res => {
      if (res.ok) {
        navigate('/dashboard');
      } else {
        res.json().then(e => setError(e.error));
      }
    });
  };

  return <>
    <Header />
    {error && <div className="error">{error}</div>}
    <EditNote onSubmit={createNote} actionLabel="Create Note" />
  </>
}
