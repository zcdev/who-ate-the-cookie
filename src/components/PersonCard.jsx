import { useEffect, useState } from 'react'

export default function PersonCard({ person, onClick, selectedID, isActive, isClicked, isAnimated }) {
  // Track animation trigger for visual feedback on click
  const [isAnimating, setIsAnimating] = useState(isActive)

  useEffect(() => {

    // Trigger animation if animation mode is enabled
    isAnimated === false ? setIsAnimating(true) : setIsAnimating(false)

    // Reset animation state after delay
    const timeout = setTimeout(() => {
      setIsAnimating(false) // Re-apply the fade-in class
    }, 1000) // 1 second fade timing

    // Clean up on update
    return () => clearTimeout(timeout)

  }, [isClicked]) // Re-run on each character click

  return (
    <li className={`person${selectedID === person.id && isAnimating === true ? ' active-glow' : ''}`}
      onClick={onClick}
      key={person.id}>
      <p className="name">{person.name[0]}</p>
      <div className={`emoji${selectedID === person.id && isAnimating === true ? ' active-zoom' : ''}`}>{person.name[1]}</div>
    </li>
  )
}