import { useState, useRef, useEffect, useReducer } from 'react'
import PersonCard from "./components/PersonCard"
import MessageBoard from './components/MessageBoard'
import Button from './components/Button'

// List of the characters and their attributes for the game
const personsList = [
  { "id": 0, "name": ["David", "👱🏻‍♂️"], "voice": "John", "message": "I think it’s Sam.", "active": false },
  { "id": 1, "name": ["Lisa", "👩🏽"], "voice": "Linda", "message": "Ask David.", "active": false },
  { "id": 2, "name": ["Sam", "🧑🏿‍🦱"], "voice": "Mike", "message": "It must be Julia.", "active": false },
  { "id": 3, "name": ["Julia", "👧🏻"], "voice": "Amy", "message": "Lisa knows.", "active": false }
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
  speaker: null,
  click: 0,
  turnCount: 0,
  message: "",
  voice: "",
  active: false,
  isActive: false,
  isMuted: false,
  selectedID: null
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'GET_SPEAKER':
      // Get the charater data
      const person = action.payload.speaker

      // If click count is zero, update the speaker, assign message, and increment click
      if (state.click === 0) {
        return {
          ...state,
          speaker: person,
          message: person.message,
          voice: person.voice,
          click: state.click + 1,
          active: true,
          isActive: true,
          selectedID: person.id
        }
        // Check where we are at the message list
      } else if (state.turnCount < messageList.length) {
        return {
          ...state,
          message: messageList[state.turnCount],
          voice: person.voice,
          turnCount: state.turnCount + 1,
          click: state.click + 1,
          active: true,
          isActive: true,
          selectedID: person.id
        }
        // If reached the end of the message list
      } else {
        return {
          ...state,
          message: "Game over.",
          voice: person.voice,
          active: true,
          isActive: true,
          selectedID: person.id
        }
      }

    case 'START_OVER':
      return {
        ...state,
        click: 0,
        turnCount: 0,
        message: "",
        active: false,
        isActive: false,
        isMuted: false
      }

    case 'MUTE_TOGGLE':
      return {
        ...state,
        isMuted: !state.isMuted
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

  // Store the current speaker's voice and message
  let speaker = state.speaker
  let voice = state.voice
  let message = state.message

  // Store the current state of muted sound
  let silence = state.isMuted

  // Get speaker from click handler
  function getSpeaker(speaker) {
    dispatch({ type: 'GET_SPEAKER', payload: { speaker } })
  }

  // Restart game handler
  function startOver() {
    dispatch({ type: 'START_OVER' })
  }

  // Toggle to mute or resume sound
  function muteToggle() {
    dispatch({ type: 'MUTE_TOGGLE' })
  }

  // VoiceRSS configuration
  const BASE_URL = 'https://api.voicerss.org/'
  const VOICE_API_KEY = 'ec2a598df23845f7bba6ad55eb8d2328'

  // Pass the current speaker's voice and message to the VoiceRSS audio source via API key
  let audioURL = speaker ? `${BASE_URL}?key=${VOICE_API_KEY}&hl=en-us&v=${voice}&src=${encodeURIComponent(message)}` : null

  // Default audioRef
  const audioRef = useRef(null)

  // Play the generated voice message when the speaker or message changes
  useEffect(() => {

    // Create a new audio instance and assign to the audioRef
    audioRef.current = new Audio(audioURL)

    // Get the audio object
    const audio = audioRef.current

    // Check if sound should be muted, if yes, then don't play the audio
    if (!silence) {
      audio.play().then(() => {
        console.log("Audio is playing.")
      }).catch(error => {
        console.error("Audio failed to play.")
      })
    }

  }, [audioURL])

  return (
    <main>
      <h1>Who ate the cookie? <span className="large-cookie" aria-hidden="true">🍪</span></h1>
      <h2>Please turn on your speaker.</h2>
      <p className="announcement">You might not get a cookie. <br className="break" />First come, first serve.</p>
      <span className="small-cookie" aria-hidden="true">🍪</span>
      <ul className="speakers" aria-label="List of speakers to interact">
        {persons.map((person) => (
          <PersonCard
            key={person.id}
            person={person}
            selectedID={state.selectedID}
            isActive={state.isActive}
            onClick={() => getSpeaker(person)}
          />
        ))}
      </ul>
      <MessageBoard message={state.message} />
      <section className="game-control">
        <Button onClick={startOver} aria-label="Start over">
          Start Over
        </Button>
        <Button onClick={muteToggle} aria-label={silence ? "Resume Sound" : "Mute Sound"}>
          {silence ? "Resume Sound" : "Mute Sound"}
        </Button>
      </section>
    </main>
  )
}