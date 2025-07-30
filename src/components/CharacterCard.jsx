import ResponsiveImage from './ResponsiveImage'

// Renders a character card with a name and icon
export default function characterCard({ character, onClick, selectedID, isAnimated }) {

  // Apply animation styles if this character is selected and animation is active
  const isAnimating = selectedID === character.id && isAnimated === true

  return (
    <li>
      <button
        className={`character${isAnimating ? ' active-glow' : ''}`}
        onClick={onClick}
        key={character.id}>
        <p className="name">
          {character.name}
        </p>
        <div className={`icon${isAnimating ? ' active-zoom' : ''}`}>
          <ResponsiveImage
            fileName={character.img}
            alt="Character icon"
          />
        </div>
      </button>
    </li>
  )
}