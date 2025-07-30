// Initial game state
export const initialState = {
    speaker: null,
    click: 0,
    turnCount: 0,
    message: "",
    voiceId: "",
    active: false,
    isMuted: false,
    isClicked: false,
    isGameOver: false,
    isAnimated: true,
    isCookieAvail: true,
    isVoiceAvail: true,
    selectedID: null,
    messageList: [
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
};

// Reducer for managing game state transitions
export default function reducer(state, action) {
    switch (action.type) {

        // Handle character click
        case 'GET_SPEAKER':
            const character = action.payload.speaker

            // First click: show character's initial message
            if (state.click === 0) {
                return {
                    ...state,
                    speaker: character,
                    message: character.message,
                    voiceId: character.voiceId,
                    click: state.click + 1,
                    active: true,
                    selectedID: character.id
                }

                // During message cycle
            } else if (state.turnCount < state.messageList.length) {
                return {
                    ...state,
                    message: state.messageList[state.turnCount],
                    voiceId: character.voiceId,
                    turnCount: state.turnCount + 1,
                    click: state.click + 1,
                    active: true,
                    selectedID: character.id
                }

                // End of message cycle
            } else {
                return {
                    ...state,
                    message: "Game over.",
                    voiceId: character.voiceId,
                    active: true,
                    isGameOver: true,
                    selectedID: character.id
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
