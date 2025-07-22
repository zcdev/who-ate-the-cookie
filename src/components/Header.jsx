import { useEffect, useState } from 'react'

export default function Header({ isMuted, isGameOver, isAnimated }) {

    // Track animation state for spinning cookie
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        // Animate spinning cookie if game is over
        if (isGameOver === true && isAnimated === true) {
            setIsAnimating(true)
        } else {
            setIsAnimating(false)
        }
    }, [isGameOver, isAnimated]) // Re-run when game is over and animation mode is on

    return (
        <header>
            <h1>Who ate the cookie? <span className={`large-cookie${isAnimating === true ? " spinning-cookie" : ""}`} aria-hidden="true">🍪</span></h1>
            <h2>Please turn on your speaker.
                <br className="break" />
                <span className="game-mode">{`${isMuted === true ? "Game in silent mode," : "Sound is on,"}
                ${isAnimated === true ? "animation is on." : "animation paused."}`}
                </span>
            </h2>
            <p className="announcement">You might not get a cookie. <br className="break" />First come, first serve.</p>
            <span className={`small-cookie${isAnimating === true ? " spinning-cookie" : ""}`} aria-hidden="true">🍪</span>
        </header>
    )
}