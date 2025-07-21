import { useEffect, useState } from 'react'

export default function MessageBoard({ message, isClicked }) {

    // Get click status and store it in state
    const [show, setShow] = useState(isClicked)

    // Display conditional text for the message
    let text = message ? message : "Game on: click any of us to find out!"

    const MessageDisplay = ({ text }) => { return <section className={`message-board ${show ? 'show' : ''}`} aria-live="polite" role="status">{text}</section> }

    const DefaultMessage = ({ text }) => { return <section className="default-display">{text}</section> }

    useEffect(() => {
        
        setShow(true) // Set show to true

        // Short delay to let DOM process the class removal
        const timeout = setTimeout(() => {
            setShow(false) // Re-apply the fade-in class
        }, 3000) // 3 seconds to trigger a reflow

        return () => clearTimeout(timeout); // clean up if component updates
    }, [isClicked]) // run this every time when character is clicked

    return (
        <>
            {message ? <MessageDisplay text={text} /> : <DefaultMessage text={text} />}
        </>
    )
}