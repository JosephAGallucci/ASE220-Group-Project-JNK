export default function LargeNote({ note }) {
    var noteColor;
    switch (note.tag) {
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
            <h3>{note.title}</h3>
            <div style={{ background: noteColor }} className="largenote">
                {note.content}
            </div>
        </>
    )
}
