export default function MessageBoard({ message }) {
    return (
        <section className="message-board">
            {message ? message : "Click any of us to find out!"}
        </section>
    )
}