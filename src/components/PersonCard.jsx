import ResponsiveImage from './ResponsiveImage'

// Renders a character card with name and icon
export default function PersonCard({ person, onClick, selectedID, isAnimated }) {

    // Renders the person 
    const PersonButton = () => {
    // Apply animation if this character is selected and animation is active
    const isAnimating = selectedID === person.id && isAnimated === true

    return (
      <li>
        <button
          className={`person${isAnimating ? ' active-glow' : ''}`}
          onClick={onClick}
          key={person.id}>
          <p
            className="name">
            {person.name}
          </p>
          <div
            className={`icon${isAnimating ? ' active-zoom' : ''}`}>
            <ResponsiveImage
              fileName={person.img}
              alt="Character icon"
            />
          </div>
        </button>
      </li>
    )
  }

  return (
    <PersonButton />
  )
}