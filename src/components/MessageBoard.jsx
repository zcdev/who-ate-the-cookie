export default function MessageBoard({ message }) {
    return (
        <section className="message-board">
            {message ? message : "Game on: click any of us to find out!"}
        </section>
    )
}