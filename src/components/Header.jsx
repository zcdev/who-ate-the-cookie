import { useEffect, useState } from 'react'
import ResponsiveImage from './ResponsiveImage'

export default function Header({ isMuted, isGameOver, isAnimated, isCookieAvail, isVoiceAvail }) {

  // Tracks whether the cookie icon should spin (used for game-over animation)
  const [isAnimating, setIsAnimating] = useState(false)

  // Set Out of Service game status
  const isOutOfServie = isCookieAvail === false || isVoiceAvail === false

  // Renders the cookie image with size-based styling and optional animation
  const CookieIcon = ({ size = "large" }) => {

    // Determine small cookie classes
    const smallCookie = isOutOfServie && size !== "large"
    ? "out-of-service-cookie"
    : "cookie-small"

    // Determine size-based class
    const sizeClass = size === "large"
      ? "cookie-large"
      : smallCookie

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

  const ServiceBanner = () => {
    return (
      <section>
        <h2 className={isOutOfServie === true ? "out-of-service-msg" : ""}>
          {isOutOfServie === true ? "Sorry, the game is currently out of service." : "Please enable your speakers to play."}
        </h2>
        <div className={`game-mode ${isOutOfServie === true  ? "out-of-service" : ""}`}>
            {isMuted ? "Game in silent mode, " : "Sound is on, "}
            {isAnimated ? "animation is on." : "animation paused."}
        </div>
        <p className={`announcement ${isOutOfServie === true ? "out-of-service" : ""}`}>
          You might not get a cookie.<br className="break" /> First come, first serve.
        </p>
      </section>
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

      <ServiceBanner />

      <CookieIcon
        size="small"
        isAnimating={isAnimated}
      />
    </header>
  )
}