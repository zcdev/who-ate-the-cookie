export default function Header({ silence, isGameOver }) {
    return (
        <header>
            <h1>Who ate the cookie? <span className={`large-cookie ${isGameOver ? "game-over-glow" : ""}`} aria-hidden="true">🍪</span></h1>
            <h2>Please turn on your speaker. <span className="sound-status">{silence ? "Game is in silent mode" : "Game sound is on"}</span></h2>
            <p className="announcement">You might not get a cookie. <br className="break" />First come, first serve.</p>
            <span className={`small-cookie ${isGameOver ? "game-over-glow" : ""}`} aria-hidden="true">🍪</span>
        </header>
    )
}