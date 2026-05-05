export default function SearchBar ({filterText, onFilterTextChange}) {
    return (
        <form>
            <input type="text" placeholder="Search..."
            onChange={(e) => onFilterTextChange(e.target.value)} />
        </form>
    )
}