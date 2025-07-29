'use client';

import { useReducer, useState, useEffect, useRef } from 'react';
import reducer, { initialState } from 'lib/reducer';
import Header from './Header';
import CharacterCard from './CharacterCard';
import MessageBoard from './MessageBoard';
import Button from './Button';

// Character data and their attributes
const personsList = [
    { "id": 0, "name": "David", "img": "icon_david", "voice": "John", "message": "I think it’s Sam.", "active": false },
    { "id": 1, "name": "Lisa", "img": "icon_lisa", "voice": "Linda", "message": "Ask David.", "active": false },
    { "id": 2, "name": "Sam", "img": "icon_sam", "voice": "Mike", "message": "It must be Julia.", "active": false },
    { "id": 3, "name": "Julia", "img": "icon_julia", "voice": "Amy", "message": "Lisa knows.", "active": false }
];

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
];

export default function Main() {
    // Character list state (static in this app)
    const [persons, setPersons] = useState(personsList);

    // Game state management
    const [state, dispatch] = useReducer(reducer, initialState);

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
    } = state;

    // Dynamic labels for control buttons
    const silentMode = isMuted ? "Resume Sound" : "Mute Sound";
    const animationMode = isAnimated ? "Stop Animation" : "Start Animation";

    // Handle character selection
    function getSpeaker(speaker) {
        dispatch({ type: 'GET_SPEAKER', payload: { speaker } });
    }

    // Control button handlers
    function startOver() {
        dispatch({ type: 'START_OVER' });
    }

    function muteToggle() {
        dispatch({ type: 'MUTE_TOGGLE' });
    }

    function animateToggle() {
        dispatch({ type: 'ANIMATE_TOGGLE' });
    }

    // VoiceRSS API config
    const BASE_URL = 'https://api.voicerss.org/';
    const VOICE_API_KEY = 'ec2a598df23845f7bba6ad55eb8d2328';

    // Construct the audio URL based on current speaker and message
    const audioURL = speaker
        ? `${BASE_URL}?key=${VOICE_API_KEY}&hl=en-us&v=${voice}&src=${encodeURIComponent(message)}`
        : null;

    // Reference to the audio element
    const audioRef = useRef(null);

    // Handle voice playback
    useEffect(() => {
        // Skip if speaker is not yet selected
        if (!audioURL) return;

        // Create new audio instance
        audioRef.current = new Audio(audioURL);
        const audio = audioRef.current;

        // Check for API limitations and update state if necessary
        checkAPIError(audioURL, dispatch);

        // Attempt to play audio if unmuted and source is ready
        if (!isMuted && audio && audio.src) {
            audio.play()
                .then(() => console.log("Audio is playing."))
                .catch(error => console.error("Audio failed to play."));
        } else {
            console.warn("Audio source is not ready");
        }

    }, [audioURL, isMuted]);

    return (
        <main>
            <Header
                isMuted={isMuted}
                isGameOver={isGameOver}
                isAnimated={isAnimated}
                isCookieAvail={isCookieAvail}
                isVoiceAvail={isVoiceAvail}
            />
            <ul
                className="speakers"
                aria-label="List of speakers to interact">
                {persons.map((person) => (
                    <CharacterCard
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
            {isCookieAvail === true && isVoiceAvail === true &&
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
            }
        </main>
    );
}