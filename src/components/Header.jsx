import { useEffect, useState } from 'react'
import ResponsiveImage from './ResponsiveImage'

export default function Header({ isMuted, isGameOver, isAnimated }) {

  // Tracks whether the cookie icon should spin (used for game-over animation)
  const [isAnimating, setIsAnimating] = useState(false)

  // Renders the cookie image with size-based styling and optional animation
  const CookieIcon = ({ size = "large" }) => {
    // Determine size-based class
    const sizeClass = size === "large"
      ? "cookie-large"
      : "cookie-small"

    // Add spin animation if active
    const animationClass = isAnimating
      ? "spinning-cookie"
      : ""

    // Combine class names
    const className = `${sizeClass} ${animationClass}`.trim()

    // Set image dimensions based on size
    const imgDimension = size === "large" ? "70" : "60"

    return (
      <ResponsiveImage
        fileName="icon_cookie"
        width={imgDimension}
        height={imgDimension}
        className={className}
        alt={`${size.charAt(0).toUpperCase() + size.slice(1)} chocolate chip cookie`}
      />
    )
  }

  useEffect(() => {
    // Enable cookie spin only when the game is over and animation is enabled
    if (isGameOver === true && isAnimated === true) {
      setIsAnimating(true)
    } else {
      setIsAnimating(false)
    }
  }, [isGameOver])

  return (
    <header>
      <h1>Who ate the cookie?</h1>

      <CookieIcon
        size="large"
        isAnimating={isAnimated}
      />

      <h2>
        Please turn on your speakers.
        <br className="break" />
        <span className="game-mode">
          {`
            ${isMuted ? "Game in silent mode," : "Sound is on,"}
            ${isAnimated ? "animation is on." : "animation paused."}
          `}
        </span>
      </h2>

      <p className="announcement">
        You might not get a cookie.<br className="break" /> First come, first serve.
      </p>

      <CookieIcon
        size="small"
        isAnimating={isAnimated}
      />
    </header>
  )
}