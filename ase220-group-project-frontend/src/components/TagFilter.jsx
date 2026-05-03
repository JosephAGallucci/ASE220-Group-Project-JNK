export default function TagFilter()
{
    return(
        <form className="filtertag">
            <h4>Filter by Tags</h4>

            <label><input type="checkbox" value="science" />Science</label>
            <label><input type="checkbox" value="math" />Math</label>
            <label><input type="checkbox" value="history" />History</label>
            <label><input type="checkbox" value="music" />Music</label>
            <label><input type="checkbox" value="art" />Art</label>
            <label><input type="checkbox" value="english" />English</label>
            <label><input type="checkbox" value="other" />Other</label>

            <input type="submit"></input>
        </form>
    )
}