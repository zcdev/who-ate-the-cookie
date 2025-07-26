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
          <picture>
            <source
              type="image/webp"
              width="100"
              height="100"
              srcSet={`./assets/icons/${person.img}.webp`}
              alt="Character icon"
            />
            <img
              width="100"
              height="100"
              src={`./assets/icons/${person.img}.png`}
              alt="Character icon"
            />
          </picture>
        </div>
      </button>
    </li>
  )
}