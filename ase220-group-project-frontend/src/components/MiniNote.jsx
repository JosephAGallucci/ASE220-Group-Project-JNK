import { useNavigate } from "react-router-dom";

export default function MiniNote({ note }) {
    const navigate = useNavigate();
    const urlDirect = () => {
        navigate(`/viewnote/${note.id}`);
    }

    return (
        <div className={`mininote ${note.tag}`} onClick={urlDirect}>
            {note.title}
        </div>
    )
}
