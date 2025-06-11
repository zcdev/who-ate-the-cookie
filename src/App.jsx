import { useState } from 'react'
import PersonCard from "./components/PersonCard"
import './App.css'

// List of characters for the game
const personsList = [
  { "id": 0, "name": ["David", "👱🏻‍♂️"], "voice": "John", "speak": "I think it’s Sam.", "click": 0, "selected": false },
  { "id": 1, "name": ["Lisa", "👩🏽"], "voice": "Linda", "speak": "Ask David.", "click": 0, "selected": false },
  { "id": 2, "name": ["Sam", "🧑🏿‍🦱"], "voice": "Mike", "speak": "It must be Julia.", "click": 0, "selected": false },
  { "id": 3, "name": ["Julia", "👧🏻"], "voice": "Amy", "speak": "Lisa knows.", "click": 0, "selected": false }
]

export default function App() {
  // Initialize state with character list
  const [persons, setPersons] = useState(personsList)

  /// Handle character selection when clicked
  function handlePersonClick(id) {
    // Mark selected and increment click count
    const updatePerson = (person) => {
      return person.id === id ? { ...person, selected: true, click: person.click + 1 } : person
    }
    // Map through the list and apply update to the matching character
    setPersons(prev => prev.map(updatePerson))
  }

  return (
    <main>
      <h1>Who ate the cookie? <span className="cookie">🍪</span></h1>
      <h2>Please turn on your speaker.</h2>
      <p className="announcement">You might not get a cookie. First come, first serve.</p>
      <ul className="speakers">
        {persons.map((person) => (
          <PersonCard
            key={person.id}
            person={person}
            onClick={() => handlePersonClick(person.id)}
          />
        ))}
      </ul>
    </main>
  )
}
