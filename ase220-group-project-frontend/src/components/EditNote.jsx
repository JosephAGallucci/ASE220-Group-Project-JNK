import { useEffect, useRef, useState } from "react";

/**
 * @param {Object} props
 * @param {Object} props.note
 * @param {(title: String, content: String, tag: String) => void} props.onSubmit
 * @param {String} props.actionLabel What to display on the submit button
 */
export default function EditNote({ note, onSubmit, actionLabel }) {
    if (!note) note = { title: '', content: '', tag: 'other' };
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [tag, setTag] = useState(note.tag);
    const ref = useRef();

    const createNote = (e) => {
        e.preventDefault();

        onSubmit(title, content, tag);
    };

    useEffect(() => {
        ref.current.style.height = ref.current.scrollHeight + 'px';
    }, []);

    return (
        <form onSubmit={createNote} className="create-form">
            <input value={title} type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <textarea value={content} rows={1} ref={ref} className={`largenote ${tag}`} onChange={(e) => {
                setContent(e.target.value);
                e.target.style.height = '0';
                e.target.style.height = e.target.scrollHeight + 'px';
            }} />
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
