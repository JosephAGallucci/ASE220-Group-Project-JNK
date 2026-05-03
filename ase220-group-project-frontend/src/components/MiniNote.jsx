export default function MiniNote({noteText, noteTags})
{
    var noteColor;
    switch (noteTags)
    {
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
        <div style={{background: noteColor}} className="mininote">
            {noteText}
        </div>
    )
}