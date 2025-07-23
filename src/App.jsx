import { useState, useRef, useEffect, useReducer } from 'react'
import Header from "./components/Header"
import PersonCard from "./components/PersonCard"
import MessageBoard from './components/MessageBoard'
import Button from './components/Button'

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
  selectedID: null
}

// Reducer to manage all game-related state transitions
function gameReducer(state, action) {
  switch (action.type) {
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

    case 'MUTE_TOGGLE':
      return {
        ...state,
        isMuted: !state.isMuted
      }

    case 'CLICK_TOGGLE':
      return {
        ...state,
        isClicked: !state.isClicked
      }

    case 'ANIMATE_TOGGLE':
      return {
        ...state,
        isAnimated: !state.isAnimated
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
    isClicked,
    isMuted,
    isGameOver,
    speaker,
    voice,
    message,
    selectedID
  } = state

  // User interactive mode toggling logics
  const silentMode = isMuted ? "Resume Sound" : "Mute Sound"
  const animationMode = isAnimated ? "Stop Animation" : "Start Animation"

  // Dispatch handlers
  function getSpeaker(speaker) {
    dispatch({ type: 'GET_SPEAKER', payload: { speaker } })
    dispatch({ type: 'CLICK_TOGGLE' })
  }

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

  // Pass the current speaker's voice and message to the VoiceRSS audio source via API key
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

    // Check if sound should be muted, if yes, then don't play the audio
    if (!isMuted && audio) {
      audio.play()
        .then(() => console.log("Audio is playing."))
        .catch(error => console.error("Audio failed to play."))
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
        isClicked={isClicked}
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