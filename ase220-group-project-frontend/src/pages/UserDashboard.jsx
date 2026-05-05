import { useEffect, useState } from "react";
import { useToken } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard.jsx";

export default function UserDashboard() {
  const [notes, setNotes] = useState(null);
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    fetch('/API/user/notes', {
      headers: { authorization: `Bearer ${token}` }
    }).then(res => res.json()).then(setNotes);
  }, [token]);

  return (
    <Dashboard notes={notes} />
  )
}
