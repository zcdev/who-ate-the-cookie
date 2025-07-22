import { useEffect, useState } from 'react'

export default function Header({ silence, isGameOver, isAnimated }) {
    // Track whether the game-over glow effect is toggled
    const [isAnimating, setIsAnimating] = useState(isAnimated)

    useEffect(() => {
        // Disable glow effect if animation mode is off
        if (isGameOver === true) {
            // Then toggle the state
            setIsAnimating(true)
        }
    }, []) // Only runs once on mount

    return (
        <header>
            <h1>Who ate the cookie? <span className={`large-cookie${isAnimating ? " game-over-glow" : ""}`} aria-hidden="true">🍪</span></h1>
            <h2>Please turn on your speaker.
                <br className="break" />
                <span className="sound-status">{`${silence ? "Game is in silent mode," : "Game sound is on,"}
                ${isAnimated ? "animation is paused." : "animation is playing."}`}
                </span>
            </h2>
            <p className="announcement">You might not get a cookie. <br className="break" />First come, first serve.</p>
            <span className={`small-cookie${isAnimating ? " game-over-glow" : ""}`} aria-hidden="true">🍪</span>
        </header>
    )
}