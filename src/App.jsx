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

// List of follow-up answers for the characters to speak in sequence
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

// VoiceRSS configuration
const BASE_URL = 'https://api.voicerss.org/'
const VOICE_API_KEY = 'ec2a598df23845f7bba6ad55eb8d2328'

export default function App() {
  // Initialize state with the character list
  const [persons, setPersons] = useState(personsList)

  // Track the total of how many times answers have been spoken
  const [globalClick, setGlobalClick] = useState(0)

  // Store the speaker's ID when the character clicked
  const [speakerID, setSpeakerID] = useState(null)

  // Initialize the audio reference
  const audioRef = useRef(null)

  // Handle the current character selection when clicked
  function handlePersonClick(id) {

    // Find the current character by ID
    const person = persons.find(person => person.id === id)

    // Assign new click count and speak value
    let newClick = person.click
    let newSpeak = ""

    // Determine what the character should speak based on click count
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

    // Set the speaker's ID to state
    setSpeakerID(person.id)

    // Update the selected character's state, mark others as deselected
    setPersons(prev =>
      prev.map(person =>
        person.id === id ? { ...person, click: newClick, speak: newSpeak, selected: true } : { ...person, selected: false }
      )
    )
  }

  // Get the current speaker from the matching character
  const speaker = persons.find(person => person.id === speakerID)

  // Generate the audio URL when a speaker is selected
  const audioURL = speaker ? `${BASE_URL}?key=${VOICE_API_KEY}&hl=en-us&v=${speaker.voice}&src=${encodeURIComponent(speaker.speak)}` : null

  // Play the audio source when speaker changes
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
