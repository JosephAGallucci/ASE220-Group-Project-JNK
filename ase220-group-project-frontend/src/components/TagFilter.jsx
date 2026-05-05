export default function TagFilter({ filter, setFilter }) {
    return (
        <form className="filtertag">
            <h4>Filter by Tags</h4>
            <label><input type="checkbox" checked={filter.science} onChange={(e) => setFilter({ ...filter, science: e.target.checked })} />Science</label>
            <label><input type="checkbox" checked={filter.math} onChange={(e) => setFilter({ ...filter, math: e.target.checked })} />Math</label>
            <label><input type="checkbox" checked={filter.history} onChange={(e) => setFilter({ ...filter, history: e.target.checked })} />History</label>
            <label><input type="checkbox" checked={filter.music} onChange={(e) => setFilter({ ...filter, music: e.target.checked })} />Music</label>
            <label><input type="checkbox" checked={filter.art} onChange={(e) => setFilter({ ...filter, art: e.target.checked })} />Art</label>
            <label><input type="checkbox" checked={filter.english} onChange={(e) => setFilter({ ...filter, english: e.target.checked })} />English</label>
            <label><input type="checkbox" checked={filter.other} onChange={(e) => setFilter({ ...filter, other: e.target.checked })} />Other</label>
        </form>
    )
}
