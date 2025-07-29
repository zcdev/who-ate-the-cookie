export default function Button({ type = "button", ariaLabel, onClick, children }) {
    return (
        <button
            type={type}
            className="button"
            role="button"
            tabIndex={0}
            onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' '); }}
            aria-label={ariaLabel}
            onClick={onClick}>
            {children}
        </button>
    )
}