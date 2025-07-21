export default function PersonCard({ person, onClick, selectedID, isActive }) {
    return (
        <li className={`person ${selectedID === person.id && isActive ? 'active' : ''}`}
            onClick={onClick}
            key={person.id}>
            <p className="name">{person.name[0]}</p>
            <div className="emoji">{person.name[1]}</div>
        </li>
    )
}