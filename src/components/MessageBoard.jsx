import { useEffect, useState } from 'react'

export default function MessageBoard({ message, isClicked, isAnimated }) {

    // Track animation state for fade-in effect
    const [isAnimating, setIsAnimating] = useState(false)

    // Determine message text content
    const text = message ? message : "Game on: click any of us to find out!"

    // Animated message display when a character is clicked
    const MessageDisplay = ({ text }) => {
        return <section
            className={`message-board ${isAnimating === true ? 'animate' : ''}`}
            aria-live="polite"
            role="status">
            {text}
        </section>
    }

    // Default static display when no message has been triggered
    const DefaultMessage = ({ text }) => {
        return <section
            className="default-display">
            {text}
        </section>
    }

    useEffect(() => {
        // Determine CSS animation class should apply or not
        if (isAnimated === true) {
            setIsAnimating(true)
        } else {
            setIsAnimating(false)
        }
    }, [isClicked]) // Re-run on each character click

    return (
        <>
            {message
                ? <MessageDisplay text={text} />
                : <DefaultMessage text={text} />
            }
        </>
    )
}