import { useState, useRef, useEffect, useReducer } from 'react'
import PersonCard from "./components/PersonCard"
import './App.css'

// List of the characters and their attributes for the game
const personsList = [
  { "id": 0, "name": ["David", "👱🏻‍♂️"], "voice": "John", "message": "I think it’s Sam.", "click": 0, "selected": false },
  { "id": 1, "name": ["Lisa", "👩🏽"], "voice": "Linda", "message": "Ask David.", "click": 0, "selected": false },
  { "id": 2, "name": ["Sam", "🧑🏿‍🦱"], "voice": "Mike", "message": "It must be Julia.", "click": 0, "selected": false },
  { "id": 3, "name": ["Julia", "👧🏻"], "voice": "Amy", "message": "Lisa knows.", "click": 0, "selected": false }
]

// List of follow-up messages for the characters to speak in sequence
const messageList = [
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

// Initial game state
const initialGameState = {
  speaker: {},
  click: 0,
  sharedClick: 0,
  message: "",
  voice: ""
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'GET_SPEAKER':
      // Get the charater data
      const person = action.payload

      // DEBUG: console.log("speaker", person)

      // If click count is zero, update the speaker, assign message, and increment click
      if (state.click === 0) {
        return {
          ...state,
          speaker: person,
          message: person.message,
          click: state.click + 1
        }
      // Check where we are at the message list
      } else if (state.sharedClick < messageList.length) {
        return {
          ...state,
          message: messageList[state.sharedClick],
          sharedClick: state.sharedClick + 1,
          click: state.click + 1
        }
      // If reached the end of the message list
      } else {
        return {
          ...state,
          message: "Game over."
        }
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export default function App() {
  // Initialize state with the character list
  const [persons, setPersons] = useState(personsList)

  // Initialize scores by reducer function
  const [state, dispatch] = useReducer(gameReducer, initialGameState)

  // Get speaker from click handler
  function getSpeaker(speaker) {
    // DEBUG: console.log("getSpeaker:", speaker)
    dispatch({ type: 'GET_SPEAKER', payload: { speaker } })
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
            onClick={() => getSpeaker(person)}
          />
        ))}
      </ul>
    </main>
  )
}
