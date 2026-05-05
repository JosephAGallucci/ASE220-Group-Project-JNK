import { useState } from "react";

/**
 * @param {Object} props
 * @param {(title: String, content: String, tag: String) => void} props.onSubmit
 */
export default function EditNote({ note, onSubmit, actionLabel }) {
    if (!note) note = { title: '', content: '', tag: 'other' };
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [tag, setTag] = useState(note.tag);

    const createNote = (e) => {
        e.preventDefault();

        onSubmit(title, content, tag);
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
            <button type="submit">{actionLabel}</button>
        </form>
    )
}
