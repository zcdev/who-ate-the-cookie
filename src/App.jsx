import { useState, useRef, useEffect, useReducer } from 'react'
import Header from "./components/Header"
import PersonCard from "./components/PersonCard"
import MessageBoard from './components/MessageBoard'
import Button from './components/Button'
import checkAPIError from './utils/check-api-error.js'

// Character data and their attributes
const personsList = [
  { "id": 0, "name": "David", "img": "icon_david", "voice": "John", "message": "I think it’s Sam.", "active": false },
  { "id": 1, "name": "Lisa", "img": "icon_lisa", "voice": "Linda", "message": "Ask David.", "active": false },
  { "id": 2, "name": "Sam", "img": "icon_sam", "voice": "Mike", "message": "It must be Julia.", "active": false },
  { "id": 3, "name": "Julia", "img": "icon_julia", "voice": "Amy", "message": "Lisa knows.", "active": false }
]

// Sequence of follow-up responses
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
  isMuted: false,
  isClicked: false,
  isGameOver: false,
  isAnimated: true,
  isCookieAvail: true,
  isVoiceAvail: true,
  selectedID: null
}

// Reducer for managing game state transitions
function gameReducer(state, action) {
  switch (action.type) {

    // Handle character click
    case 'GET_SPEAKER':
      const person = action.payload.speaker

      // First click: show character's initial message
      if (state.click === 0) {
        return {
          ...state,
          speaker: person,
          message: person.message,
          voice: person.voice,
          click: state.click + 1,
          active: true,
          selectedID: person.id
        }

      // During message cycle
      } else if (state.turnCount < messageList.length) {
        return {
          ...state,
          message: messageList[state.turnCount],
          voice: person.voice,
          turnCount: state.turnCount + 1,
          click: state.click + 1,
          active: true,
          selectedID: person.id
        }

      // End of message cycle
      } else {
        return {
          ...state,
          message: "Game over.",
          voice: person.voice,
          active: true,
          isGameOver: true,
          selectedID: person.id
        }
      }

    // Reset game state
    case 'START_OVER':
      return {
        ...state,
        click: 0,
        turnCount: 0,
        message: "",
        active: false,
        isClicked: false,
        isGameOver: false,
        isMuted: false
      }

    // Toggle mute on/off
    case 'MUTE_TOGGLE':
      return {
        ...state,
        isMuted: !state.isMuted
      }

    // Trigger animation cycle (used for re-triggering transitions)
    case 'CLICK_TOGGLE':
      return {
        ...state,
        isClicked: !state.isClicked
      }

    // Toggle cookie animation manually
    case 'ANIMATE_TOGGLE':
      return {
        ...state,
        isAnimated: !state.isAnimated
      }

    // Stop animation if cookie API fails
    case 'COOKIE_UNAVAILABLE':
      return {
        ...state,
        isCookieAvail: false,
        isAnimated: false
      }

    // Stop voice output if API fails to deliver sound
    case 'VOICE_UNAVAILABLE': {
      return {
        ...state,
        isVoiceAvail: false
      }
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export default function App() {
  // Character list state (static in this app)
  const [persons, setPersons] = useState(personsList)

  // Game state management
  const [state, dispatch] = useReducer(gameReducer, initialGameState)

  // Destructure state for convenience
  const {
    isAnimated,
    isMuted,
    isGameOver,
    isCookieAvail,
    isVoiceAvail,
    speaker,
    voice,
    message,
    selectedID
  } = state

  // Dynamic labels for control buttons
  const silentMode = isMuted ? "Resume Sound" : "Mute Sound"
  const animationMode = isAnimated ? "Stop Animation" : "Start Animation"

  // Handle character selection
  function getSpeaker(speaker) {
    dispatch({ type: 'GET_SPEAKER', payload: { speaker } })
  }

  // Control button handlers
  function startOver() {
    dispatch({ type: 'START_OVER' })
  }

  function muteToggle() {
    dispatch({ type: 'MUTE_TOGGLE' })
  }

  function animateToggle() {
    dispatch({ type: 'ANIMATE_TOGGLE' })
  }

  // VoiceRSS API config
  const BASE_URL = 'https://api.voicerss.org/'
  const VOICE_API_KEY = 'ec2a598df23845f7bba6ad55eb8d2328'

  // Construct the audio URL based on current speaker and message
  const audioURL = speaker
    ? `${BASE_URL}?key=${VOICE_API_KEY}&hl=en-us&v=${voice}&src=${encodeURIComponent(message)}`
    : null

  // Reference to the audio element
  const audioRef = useRef(null)

  // Handle voice playback
  useEffect(() => {
    // Skip if speaker is not yet selected
    if (!audioURL) return

    // Create new audio instance
    audioRef.current = new Audio(audioURL)
    const audio = audioRef.current

    // Check for API limitations and update state if necessary
    checkAPIError(audioURL, dispatch)

    // Attempt to play audio if unmuted and source is ready
    if (!isMuted && audio && audio.src) {
      audio.play()
        .then(() => console.log("Audio is playing."))
        .catch(error => console.error("Audio failed to play."))
    } else {
      console.warn("Audio source is not ready")
    }

  }, [audioURL, isMuted])

  return (
    <main>
      <Header
        isMuted={isMuted}
        isGameOver={isGameOver}
        isAnimated={isAnimated}
      />
      <ul
        className="speakers"
        aria-label="List of speakers to interact">
        {persons.map((person) => (
          <PersonCard
            key={person.id}
            person={person}
            selectedID={selectedID}
            isAnimated={isAnimated}
            onClick={() => getSpeaker(person)}
          />
        ))}
      </ul>
      <MessageBoard
        message={message}
        isAnimated={isAnimated}
        isCookieAvail={isCookieAvail}
        isVoiceAvail={isVoiceAvail}
      />
      <section className="game-control">
        <Button
          onClick={startOver}
          aria-label="Start over">
          Start Over
        </Button>
        <Button
          onClick={muteToggle}
          aria-label={silentMode}>
          {silentMode}
        </Button>
        <Button
          onClick={animateToggle}
          aria-label={animationMode}>
          {animationMode}
        </Button>
      </section>
    </main>
  )
}