export default function PersonCard({ person, onClick, selectedID, isAnimated }) {
  return (
    <li>
      <button
        className={`person${selectedID === person.id && isAnimated === true
          ? ' active-glow'
          : ''}`}
        onClick={onClick}
        key={person.id}
      >
        <p
          className="name">
          {person.name}
        </p>
        <div
          className={`icon${selectedID === person.id && isAnimated === true
            ? ' active-zoom'
            : ''}`}>
          <img
            src={`./assets/icons/${person.img}`}
            alt="Character icon"
          />
        </div>
      </button>
    </li>
  )
}