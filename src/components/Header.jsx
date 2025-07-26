import { useEffect, useState } from 'react'

export default function Header({ isMuted, isGameOver, isAnimated }) {

    // Tracks whether the cookie icon should spin (used for animation state)
    const [isAnimating, setIsAnimating] = useState(false)

    // Renders the cookie icon
    function CookieIcon({ size = "large" }) {
        // Set size class based on "large" or "small"
        const sizeClass = size === "large"
            ? "cookie-large"
            : "cookie-small"
        // Add animation class if active
        const animationClass = isAnimating
            ? "spinning-cookie"
            : ""
        // Combine size and animation classes
        const className = `${sizeClass} ${animationClass}`.trim()
        // Set image dimensions based on size
        const cookieIconDimension = size === "large" ? "70" : "60"

        return (
            <picture>
                <source type="image/webp"
                    className={className}
                    width={cookieIconDimension}
                    height={cookieIconDimension}
                    srcSet="/assets/icons/icon_cookie.webp"
                    alt={`${size.charAt(0).toUpperCase() + size.slice(1)} chocolate chip cookie`} />
                <img
                    width={cookieIconDimension}
                    height={cookieIconDimension}
                    className={className}
                    src="/assets/icons/icon_cookie.png"
                    alt={`${size.charAt(0).toUpperCase() + size.slice(1)} chocolate chip cookie`}
                />
            </picture>
        )
    }

    useEffect(() => {
        // Animate spinning cookie if game is over
        if (isGameOver === true && isAnimated === true) {
            setIsAnimating(true)
        } else {
            setIsAnimating(false)
        }
    }, [isGameOver]) // Re-run when game is over and animation mode is on

    return (
        <header>
            <h1>Who ate the cookie?</h1>
            <CookieIcon
                size="large"
                isAnimating={isAnimated}
            />
            <h2>Please turn on your speakers.
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
                You might not get a cookie.<br className="break" /> First come, first serve.
            </p>
            <CookieIcon
                size="small"
                isAnimating={isAnimated}
            />
        </header>
    )
}