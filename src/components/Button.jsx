import { Children } from "react";

export default function Button({ type = "button", ariaLabel, startOver, children }) {
    return (
        <button type={type} className="button" aria-label={ariaLabel} onClick={startOver}>
            {children}
        </button>
    )
}