import { useEffect, useState } from 'react'

export default function MessageBoard({ message, isClicked, isAnimated, isCookieAvail }) {

    // Track animation state for the fade-in-out effect
    const [isAnimating, setIsAnimating] = useState(false)

    // Fade in and out when there is a message to display
    const MessageDisplay = ({message}) => (
        <section
            className={`message-board ${isAnimating === true ? 'animate' : ''}`}
            aria-hidden="true">
            {message}
        </section>
    )

    // Default static display when no message has been triggered
    const DefaultMessage = () => (
        <section
            className="default-display"
            aria-hidden="true">
            Game on: click any of us to find out!
        </section>
    )

    // Message to display when there's no more cookie (API limit reached)
    const EndMessage = () => (
        <section
            className="default-display"
            aria-hidden="true">
            There's no more cookie for the day. Come again tomorrow! 😏
        </section>
    )

    useEffect(() => {
        // Determine CSS animation should apply or not
        if (isAnimated === true) {
            setIsAnimating(true)
        } else {
            setIsAnimating(false)
        }
    }, [isClicked]) // Re-apply animation when every time a character is clicked

    // Render messages upon cookie availability
    if (isCookieAvail === true) {
        if (message) {
            return <MessageDisplay message={message} />
        } else {
            return <DefaultMessage />
        }   
    } else {
        return <EndMessage />
    }
}