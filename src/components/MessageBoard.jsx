import { useEffect, useState } from 'react'

export default function MessageBoard({ message, isClicked, isAnimated, isCookieAvail, isVoiceAvail }) {

  // Tracks whether the fade-in-out animation should be active
  const [isAnimating, setIsAnimating] = useState(false)

  // Message shown with fade animation
  const MessageDisplay = ({ message }) => (
    <section
      className={`message-board ${isAnimating ? 'animate' : 'static'}`}
      aria-hidden="true">
      {message}
    </section>
  )

  // Default message shown when the game is active and no selection has been made yet
  const DefaultMessage = () => (
    <section
      className="default-display"
      aria-hidden="true">
      Game on: click any of us to find out!
    </section>
  )

  // Message shown when cookies are no longer available (e.g., API limit reached)
  const EndMessage = () => (
    <section
      className="default-display"
      aria-hidden="true">
      There's no more cookie for the day. Come again tomorrow! 😏
    </section>
  )

  // Message shown when voice is unavailable
  const UnavailMessage = () => (
    <section
      className="default-display"
      aria-hidden="true">
      No cookie left... and no one’s saying a word. 🤐 Suspiciously silent, huh?
    </section>
  )

  useEffect(() => {
    // Enable or disable the animation based on the current animation state
    if (isAnimated === true) {
      setIsAnimating(true)
    } else {
      setIsAnimating(false)
    }
  }, [isAnimated, isClicked]) // Trigger animation update when a character is clicked

  // Determine which message to display based on API response statuses
  if (isVoiceAvail === true) {
    if (isCookieAvail === true) {
      return message ? <MessageDisplay message={message} /> : <DefaultMessage />
    } else {
      return <EndMessage />
    }
  } else {
    return <UnavailMessage />
  }
}