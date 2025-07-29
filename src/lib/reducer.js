// Initial game state
export const initialState = {
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
};

// Reducer for managing game state transitions
export default function reducer(state, action) {
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
        isVoiceAvail: false,
        isAnimated: false
      }
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
