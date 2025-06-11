export default function PersonCard({ person, onClick }) {
    return (
        <li className={`person ${person.selected ? 'active' : ''}`}
            onClick={onClick}
            key={person.id}>
            <p className="name">{person.name[0]}</p>
            <div className="icon">{person.name[1]}</div>
        </li>
    )
}
