export default function LargeNote({ note }) {
    return (
        <>
            <h3>{note.title}</h3>
            <div className={`largenote ${note.tag}`}>
                {note.content}
            </div>
        </>
    )
}
