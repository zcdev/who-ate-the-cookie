export default function PersonCard({ person, onClick, selectedID }) {
    console.log("person", person)
    return (
        <li className={`person ${person.active === true && selectedID === person.id ? 'active' : ''}`}
            onClick={onClick}
            key={person.id}>
            <p className="name">{person.name[0]}</p>
            <div className="icon">{person.name[1]}</div>
        </li>
    )
}