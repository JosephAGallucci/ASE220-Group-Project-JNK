import Header from "../components/Header.jsx";
import EditNote from "../components/EditNote.jsx";
import { useNavigate } from "react-router-dom";
import { useToken } from "../context/AuthContext.jsx";

export default function CreateNote() {
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
    }).then(navigate('/dashboard'));
  };

  return <>
    <Header />
    <EditNote onSubmit={createNote} actionLabel="Create Note" />
  </>
}
