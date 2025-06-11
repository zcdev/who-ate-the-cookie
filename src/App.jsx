import { useState, useRef } from 'react'
import PersonCard from "./components/PersonCard"
import './App.css'

// List of characters for the game
const personsList = [
  { "id": 0, "name": ["David", "👱🏻‍♂️"], "voice": "John", "speak": "I think it’s Sam.", "click": 0, "selected": false },
  { "id": 1, "name": ["Lisa", "👩🏽"], "voice": "Linda", "speak": "Ask David.", "click": 0, "selected": false },
  { "id": 2, "name": ["Sam", "🧑🏿‍🦱"], "voice": "Mike", "speak": "It must be Julia.", "click": 0, "selected": false },
  { "id": 3, "name": ["Julia", "👧🏻"], "voice": "Amy", "speak": "Lisa knows.", "click": 0, "selected": false }
]

// Set up VoiceRSS constants
const BASE_URL = 'https://api.voicerss.org/'
const VOICE_API_KEY = 'ec2a598df23845f7bba6ad55eb8d2328'

export default function App() {
  // Initialize state with character list
  const [persons, setPersons] = useState(personsList)

  // Store one audio instance per character by ID
  const audioRefs = useRef({})

  // Handle character selection when clicked
  function handlePersonClick(id) {
    // Find clicked character by ID
    const person = persons.find(person => person.id === id)

    // If no audio exists for this character, create it
    if (!audioRefs.current[id]) {
      const url = `${BASE_URL}?key=${VOICE_API_KEY}&hl=en-us&v=${person.voice}&src=${encodeURIComponent(person.speak)}`
      audioRefs.current[id] = new Audio(url)
      
      // TODO: Debuggin info (remove later)
      console.log(url)
      console.log(audioRefs.current[id])
    }

    // Update selected state and increment click count
    setPersons(prev =>
      prev.map(person =>
        person.id === id
          ? { ...person, selected: true, click: person.click + 1 }
          : person
      )
    )
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
