import { useState, useRef, useEffect } from 'react'
import PersonCard from "./components/PersonCard"
import './App.css'

// List of the characters and their attributes for the game
const personsList = [
  { "id": 0, "name": ["David", "👱🏻‍♂️"], "voice": "John", "speak": "I think it’s Sam.", "click": 0, "selected": false },
  { "id": 1, "name": ["Lisa", "👩🏽"], "voice": "Linda", "speak": "Ask David.", "click": 0, "selected": false },
  { "id": 2, "name": ["Sam", "🧑🏿‍🦱"], "voice": "Mike", "speak": "It must be Julia.", "click": 0, "selected": false },
  { "id": 3, "name": ["Julia", "👧🏻"], "voice": "Amy", "speak": "Lisa knows.", "click": 0, "selected": false }
]

// List of answers for the characters to speak
const answersList = [
  "I didn’t eat it.",
  "I don’t know.",
  "Who knows?",
  "I don’t really care.",
  "Someone in the kitchen.",
  "I was in the living room.",
  "There was nothing on the table.",
  "I only got milk.",
  "I don’t like cookies.",
  "It’s not me.",
  "Forget it.",
  "I was not hungry.",
  "Ok, it’s me. Here’s a cookie for you."
]

// Declare VoiceRSS constants
const BASE_URL = 'https://api.voicerss.org/'
const VOICE_API_KEY = 'ec2a598df23845f7bba6ad55eb8d2328'

export default function App() {
  // Initialize state with the character list
  const [persons, setPersons] = useState(personsList)

  // Track the total of how many times answers have been spoken
  const [globalClick, setGlobalClick] = useState(0)

  const [speakerID, setSpeakerID] = useState(null)

  const audioRef = useRef(null)

  // Handle the current character selection when clicked
  function handlePersonClick(id) {

    // Find the current character by ID
    const person = persons.find(person => person.id === id)

    // Assign new click count and speak value
    let newClick = person.click
    let newSpeak = ""

    // Evaluate click counts to determine what the current character should speak
    if (newClick === 0) {
      newSpeak = person.speak
    } else if (globalClick < answersList.length) {
      newSpeak = answersList[globalClick]
      // Update the total clicks as the index value of the answersList
      setGlobalClick(prev => prev + 1);
    } else {
      newSpeak = "Game over."
    }

    // Increment the click count on the selected character
    newClick++
    setSpeakerID(person.id)

    // Update the character's state
    setPersons(prev =>
      prev.map(person =>
        person.id === id ? { ...person, click: newClick, speak: newSpeak, selected: true } : { ...person, selected: false }
      )
    )
  }

  const speaker = persons.find(person => person.id === speakerID)

  // Parse the URL to access the character's voice
  const audioURL = speaker ? `${BASE_URL}?key=${VOICE_API_KEY}&hl=en-us&v=${speaker.voice}&src=${encodeURIComponent(speaker.speak)}` : null

  useEffect(() => {

    if (!audioURL) return
    audioRef.current = new Audio(audioURL)
    audioRef.current.play().catch(error => {
      console.log("Audio play failed", error)
    })

  }, [audioURL])

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
