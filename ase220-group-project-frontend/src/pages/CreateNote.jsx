import LargeNote from "../components/LargeNote.jsx";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToken } from "../context/AuthContext.jsx";

export default function ViewNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('other');
  const { token } = useToken();
  const navigate = useNavigate();

  if (!token) {
    navigate('/login');
  }

  const createNote = (e) => {
    e.preventDefault();

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
    }).then(navigate('/dashboard'));
  };

  var noteColor;
  switch (tag) {
    default:
      noteColor = 'yellow';
      break;

    case 'science':
      noteColor = 'green';
      break;

    case 'math':
      noteColor = 'lightblue';
      break;

    case "music":
      noteColor = 'red';
      break;

    case "history":
      noteColor = 'pink';
      break;

    case "art":
      noteColor = 'orange';
      break;

    case "english":
      noteColor = 'purple';
      break;
  }
  return (
    <>
      <Header />
      <form onSubmit={createNote} className="create-form">
        <input value={title} type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <textarea value={content} style={{ background: noteColor }} className="largenote" onChange={(e) => setContent(e.target.value)} />
        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="history">History</option>
          <option value="music">Music</option>
          <option value="art">Art</option>
          <option value="english">English</option>
          <option value="other">Other</option>
        </select>
        <button type="submit">Create Note</button>
      </form>
    </>
  )
}
