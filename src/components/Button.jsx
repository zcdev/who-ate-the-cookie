import { Children } from "react";

export default function Button({ type = "button", ariaLabel, onClick, children }) {
    return (
        <button
            type={type}
            className="button"
            aria-label={ariaLabel}
            onClick={onClick}>
            {children}
        </button>
    )
}