import { useEffect, useState } from 'react'

export default function PersonCard({ person, onClick, selectedID, isActive, isClicked }) {
    const [isZoomed, setIsZoomed] = useState(isActive)

      useEffect(() => {
        // set zoom to true
        setIsZoomed(true)
    
        // Short delay to let DOM process the class removal
        const timeout = setTimeout(() => {
          setIsZoomed(false); // Re-apply the fade-in class
        }, 1000) // 1 second is enough to trigger a reflow
    
        return () => clearTimeout(timeout) // clean up if component updates
      }, [isClicked]) // run this every time when character is clicked

    return (
        <li className={`person ${selectedID === person.id && isActive ? 'active-glow' : ''}`}
            onClick={onClick}
            key={person.id}>
            <p className="name">{person.name[0]}</p>
            <div className={`emoji ${selectedID === person.id && isZoomed ? 'active-zoom' : ''}`}>{person.name[1]}</div>
        </li>
    )
}