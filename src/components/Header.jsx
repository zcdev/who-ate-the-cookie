import { useEffect, useState } from 'react'

export default function Header({ isMuted, isGameOver, isAnimated }) {

    // Track animation state for spinning cookie
    const [isAnimating, setIsAnimating] = useState(false)

    // Cookie icon image
    function CookieIcon({ size = "large" }) {
        const sizeClass = size === "large"
            ? "cookie-large"
            : "cookie-small"
        const animationClass = isAnimating
            ? "spinning-cookie"
            : ""
        const className = `${sizeClass} ${animationClass}`

        return (
            <img
                className={className}
                src="/assets/icons/icon_cookie.png"
                alt="Cookie icon"
            />
        )
    }

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
            <h1>Who ate the cookie?</h1>
            <CookieIcon
                size="large"
                isAnimating={isAnimated}
            />
            <h2>Please turn on your speaker.
                <br
                    className="break"
                />
                <span
                    className="game-mode">
                    {`
                    ${isMuted === true
                            ? "Game in silent mode,"
                            : "Sound is on,"}
                    ${isAnimated === true
                            ? "animation is on."
                            : "animation paused."}
                    `}
                </span>
            </h2>
            <p
                className="announcement">
                You might not get a cookie.
                <br
                    className="break"
                />
                First come, first serve.
            </p>
            <CookieIcon
                size="size"
                isAnimating={isAnimated}
            />
        </header>
    )
}