import { useEffect, useState } from 'react'

export default function MessageBoard({ message, isClicked, isAnimated }) {

    // Track animation state for fade-in effect
    const [isAnimating, setIsAnimating] = useState(isAnimated)

    // Determine message text content
    let text = message ? message : "Game on: click any of us to find out!"

    // Determine CSS animation class
    let animation
    if (isAnimating === true) {
        animation = 'show'
    } else {
        animation = 'static'
    }

    // Animated message display when a character is clicked
    const MessageDisplay = ({ text }) => { return <section className={`message-board ${isAnimating === true ? animation : ''}`} aria-live="polite" role="status">{text}</section> }

    // Default static display when no message has been triggered
    const DefaultMessage = ({ text }) => { return <section className="default-display">{text}</section> }

    useEffect(() => {

        // Trigger animation on character click
        setIsAnimating(true)

        // Reset animation after delay
        const timeout = setTimeout(() => {
            setIsAnimating(false) // Re-apply the fade-in class
        }, 3000) // 3 seconds before resetting

        // clean up if component updates
        return () => clearTimeout(timeout)
    }, [isClicked]) // Re-run on each character click

    return (
        <>
            {message ? <MessageDisplay text={text} /> : <DefaultMessage text={text} />}
        </>
    )
}