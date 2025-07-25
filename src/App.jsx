import { useState, useRef, useEffect, useReducer } from 'react'
import Header from "./components/Header"
import PersonCard from "./components/PersonCard"
import MessageBoard from './components/MessageBoard'
import Button from './components/Button'
import checkAPIError from './utils/check-api-error.js'

// List of characters and their attributes
const personsList = [
  { "id": 0, "name": "David", "img": "icon_david.png", "voice": "John", "message": "I think it’s Sam.", "active": false },
  { "id": 1, "name": "Lisa", "img": "icon_lisa.png", "voice": "Linda", "message": "Ask David.", "active": false },
  { "id": 2, "name": "Sam", "img": "icon_sam.png", "voice": "Mike", "message": "It must be Julia.", "active": false },
  { "id": 3, "name": "Julia", "img": "icon_julia.png", "voice": "Amy", "message": "Lisa knows.", "active": false }
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
  selectedID: null
}

// Reducer to manage all game-related state transitions
function gameReducer(state, action) {
  switch (action.type) {
    // Character card click
    case 'GET_SPEAKER':
      // Get the charater data
      const person = action.payload.speaker

      // First speaker: show their initial message
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
      // Show next message in sequence
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
      // End of message list
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

    // Reset game state at the Start Over button
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

    // Toggle sound at the Mute Sound button
    case 'MUTE_TOGGLE':
      return {
        ...state,
        isMuted: !state.isMuted
      }

    // Track character clicks for MessageBoard to conditionally apply animation
    case 'CLICK_TOGGLE':
      return {
        ...state,
        isClicked: !state.isClicked
      }

    // Toggle animation at the Stop Animation button
    case 'ANIMATE_TOGGLE':
      return {
        ...state,
        isAnimated: !state.isAnimated
      }

    // Update cookie availability if API reached the limit cap: 350 calls/day
    case 'COOKIE_UNAVAILABLE':
      return {
        ...state,
        isCookieAvail: false
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export default function App() {
  // Game characters
  const [persons, setPersons] = useState(personsList)

  // Global game state
  const [state, dispatch] = useReducer(gameReducer, initialGameState)

  // Reducer state object
  const {
    isAnimated,
    isMuted,
    isGameOver,
    isCookieAvail,
    speaker,
    voice,
    message,
    selectedID
  } = state

  // User interactive mode toggling logics
  const silentMode = isMuted ? "Resume Sound" : "Mute Sound"
  const animationMode = isAnimated ? "Stop Animation" : "Start Animation"

  // Get speaker data on click
  function getSpeaker(speaker) {
    dispatch({ type: 'GET_SPEAKER', payload: { speaker } })
  }

  // Start Over button dispatch action
  function startOver() {
    dispatch({ type: 'START_OVER' })
  }

  // Mute Sound button dispatch action
  function muteToggle() {
    dispatch({ type: 'MUTE_TOGGLE' })
  }

  // Stop Animation button dispatch action
  function animateToggle() {
    dispatch({ type: 'ANIMATE_TOGGLE' })
  }

  // VoiceRSS API configs
  const BASE_URL = 'https://api.voicerss.org/'
  const VOICE_API_KEY = 'ec2a598df23845f7bba6ad55eb8d2328'

  // Insert the current speaker's voice and message to the VoiceRSS audio URL format
  const audioURL = speaker
    ? `${BASE_URL}?key=${VOICE_API_KEY}&hl=en-us&v=${voice}&src=${encodeURIComponent(message)}`
    : null

  // Default audioRef
  const audioRef = useRef(null)

  // Play voice message when speaker or message changes
  useEffect(() => {

    // Create a new audio instance and assign to the audioRef
    audioRef.current = new Audio(audioURL)

    // Get the audio object
    const audio = audioRef.current

    // Check API response as text by fetching the audioURL and update cookie availability via dispatch
    checkAPIError(audioURL, dispatch)

    // Check if sound should be muted, if yes, then don't play the audio
    if (!isMuted && audio) {
      audio.play()
        .then(() => console.log("Audio is playing."))
        .catch(error => {
          console.error("Audio failed to play.")
        })
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
      />
      <section
        className="game-control">
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