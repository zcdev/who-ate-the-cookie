export default function PersonCard({ person, onClick, selectedID, isAnimated }) {
  return (
    <li className={`person${selectedID === person.id && isAnimated === true ? ' active-glow' : ''}`}
      onClick={onClick}
      key={person.id}>
      <p className="name">{person.name[0]}</p>
      <div className={`emoji${selectedID === person.id && isAnimated === true ? ' active-zoom' : ''}`}>{person.name[1]}</div>
    </li>
  )
}